const passport = require('passport');
const express = require('express');
const banRouter = express.Router();
const prisma = require('../lib/prismaClient');
const bodyParser = require('body-parser');
//WIP; need to add passport.authenticate(token) after testing

banRouter.post(
    '/create', async (req, res) => {
        const days = 30;
        await prisma.ban.create({
            data: {
                userId: 'cl9q1pnx20003i0edgynd9la0',
                banUntil: new Date(Date.now() + (days * 24 * 60 * 60 * 1000)),
                banMessage: "message",
                banReason: "reason",
                isWarning: true,
            }
        })
        res.json("ban created");
    }
)

banRouter.post(
    '/create/:userId',
    bodyParser.json(),
    async (req, res) => {
        const foundUser = await prisma.user.findUnique({ where: { id: req.params.userId } });
        if (!foundUser) {
            return res.status(400).json({
                message: `The comment with that listed ID (${req.params.userId}) does not exist.`,
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
                userId: req.params.userId,
                banUntil: new Date(Date.now() + (req.body.banDuration * 24 * 60 * 60 * 1000)),
                banMessage: req.body.banMessage,
                banReason: req.body.banReason,
                isWarning: req.body.isWarning,
            }
        });
        res.json("ban created");
    }
)

module.exports = banRouter;
