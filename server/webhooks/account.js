const express = require('express');
const { startsWith } = require('lodash');
const accountRouter = express.Router();
const prisma = require('../lib/prismaClient');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

accountRouter.get(
    '/details',
    async (req, res) => {
        try {
            const result = await prisma.userStripe.findFirst({
                where: {
                    userId: req.query.userId
                }
            })

            res.status(200).json(result);

        } catch (error) {
            console.log(error);
            res.status(400).end();
        } finally {
            await prisma.$disconnect();
        }
    }
)

accountRouter.post(
    '/cancel',
    async (req, res) => {
        try {
            const event = req.body;
            let parsedStripeId;

            switch (event.type) {
                case 'customer.subscription.deleted':
                    parsedStripeId = event.data.object.customer;
                    console.log(`subscription deleted for stripe customer ${parsedStripeId}`);
                    break;

                default:
                    return res.status(400).end();
            }

            const deleteStripeId = await prisma.userStripe.deleteMany({
                where: {
                    stripeId: parsedStripeId
                }
            })

            res.status(200).json(deleteStripeId);

        } catch (error) {
            console.log(error);
            res.status(400).end();
        } finally {
            await prisma.$disconnect();
        }
    }
)

accountRouter.post(
    '/subscribe',
    async (req, res) => {
        try {
            const event = req.body;
            let stripeId;

            switch (event.type) {
                case 'payment_intent.succeeded':
                    stripeId = event.data.object.customer;
                    console.log(`PaymentIntent success for customer ${stripeId}`);
                    await prisma.userStripe.updateMany({
                        where:{
                            stripeId: stripeId
                        },
                        data: {
                            status:"active"
                        }
                    })
                    break;
                default:
                    return res.status(400).end();
            }
          
            res.status(200).json({});

        } catch (error) {
            console.log(error);
            res.status(400).end();
        } finally {
            await prisma.$disconnect;
        }
    }
)

accountRouter.post(
    '/activate',
    async (req, res) => {
        try {
            const result = await prisma.userStripe.findFirst({
                where: {
                    userId: req.body.userId
                }
            })

            const session = await stripe.checkout.sessions.create({
                success_url: 'http://localhost:3000',
                cancel_url: 'http://localhost:3000',
                line_items: [
                  {price: 'price_1KyfAKDabqllr9PHaxnGcKSm', quantity: 1},
                ],
                customer: result.stripeId,
                mode: "subscription"
              });

            res.status(200).json(session);

        } catch (error) {
            console.log(error);
            res.status(400).end();
        } finally {
            await prisma.$disconnect;
        }
    }
)

accountRouter.post(
    '/update',
    async (req, res) => {
        try {
            const result = await prisma.userStripe.findFirst({
                where: {
                    userId: req.body.userId
                }
            })
            const session = await stripe.billingPortal.sessions.create({
                return_url: 'http://localhost:3000',
                customer: result.stripeId,
              });

            res.status(200).json(session);

        } catch (error) {
            console.log(error);
            res.status(400).end();
        } finally {
            await prisma.$disconnect;
        }
    }
)

module.exports = accountRouter;