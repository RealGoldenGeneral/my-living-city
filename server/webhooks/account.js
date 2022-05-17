const express = require('express');
const { startsWith } = require('lodash');
const accountRouter = express.Router();
const prisma = require('../lib/prismaClient');

accountRouter.get(
    '/:userId',
    async (req, res) => {
        try {
            const result = await prisma.userStripe.findFirst({
                where: {
                    userId: {
                        equals: req.userId
                    }
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
    '/subscribe',
    async (req, res) => {
        try {
            let createUserStripe = await prisma.userStripe.create({
                data: {
                    userId: 'cl2nyodqn0004psun25iapajh',
                    stripeId: '890abc',
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