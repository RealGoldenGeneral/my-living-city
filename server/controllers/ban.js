const passport = require('passport');
const express = require('express');
const banRouter = express.Router();
const prisma = require('../lib/prismaClient');
//WIP; need to add passport.authenticate(token) after testing

banRouter.post(
    '/create',
    async (req, res) => {
        try {
            const foundUser = await prisma.user.findUnique({ where: { id: req.body.userId } });
            if (!foundUser) {
                return res.status(400).json({
                    message: `The user with that listed ID (${req.params.userId}) does not exist.`,
                });
            }
            // Check if user is already banned
            const userAlreadyBanned = await prisma.ban.findFirst({
                where: {
                    userId: req.params.userId
                }
            });
            if (userAlreadyBanned) {
                return res.status(400).json({
                    message: `This user is already banned.`,
                    details: {
                        errorMessage: "A user can only be banned once."
                    }
                });
            }
            const createdBan = await prisma.ban.create({
                data: {
                    userId: req.body.userId,
                    banUntil: new Date(Date.now() + (parseInt(req.body.banUntil) * 24 * 60 * 60 * 1000)),
                    banMessage: req.body.banMessage,
                    banReason: req.body.banReason,
                    isWarning: req.body.isWarning,
                }
            });
            res.status(200).json({
                message: `Successfully banned user ${req.body.userId}`,
                createdBan
            });
        } catch (error) {
            res.status(400).json({
                message: `Error occurred when trying to ban user ${req.body.userId}`,
                details: {
                    errorMessage: error.message,
                    errorStack: error.stack,
                }
            });
        }
    }
)

banRouter.get(
    '/getAll',
    async (req, res) => {
        try {
            const allBans = await prisma.ban.findMany();
            res.status(200).json(allBans)
        } catch (error) {
            res.status(400).json({
                message: `Error occurred when trying to get all banned users`,
                details: {
                    errorMessage: error.message,
                    errorStack: error.stack,
                }
            });
        }
    }
)

banRouter.get(
    '/get/:userId',
    async (req, res) => {
        try {
            const userBan = await prisma.ban.findUnique({
                where: {
                    userId: req.params.userId
                }
            });
            if (userBan) {
                res.status(200).json(userBan)
            } else {
                res.status(400).json({
                    message: `The user with that listed ID (${req.params.userId}) is not banned.`
                })
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: `Error occurred when trying to get banned user ${req.params.userId}`,
                details: {
                    errorMessage: error.message,
                    errorStack: error.stack,
                }
            });
        }
    }
)

module.exports = banRouter;
