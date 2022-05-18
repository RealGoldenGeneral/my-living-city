const express = require('express');
const { startsWith } = require('lodash');
const accountRouter = express.Router();
const prisma = require('../lib/prismaClient');

accountRouter.get(
    '/details',
    async (req, res) => {
        try {
            const result = await prisma.userStripe.findFirst({
                where: {
                    userId: req.body.userId
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
                    break;
                default:
                    return res.status(400).end();
            }

            let createUserStripe = await prisma.userStripe.create({
                data: {
                    userId: 'cl2nyodqn0004psun25iapajh',
                    stripeId: stripeId,
                    status: 'ACTIVE'
                }
            })

            res.status(200).json(createUserStripe);

        } catch (error) {
            console.log(error);
            res.status(400).end();
        } finally {
            await prisma.$disconnect;
        }
    }
)

module.exports = accountRouter;