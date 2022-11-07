const passport = require('passport');
const express = require('express');
const banRouter = express.Router();
const prisma = require('../lib/prismaClient');

banRouter.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const foundUser = await prisma.user.findUnique({ where: { id: req.body.userId } });
            if (!foundUser) {
                return res.status(400).json({
                    message: `The user with that listed ID (${req.body.userId}) does not exist.`,
                });
            }
            // Check if user is already banned
            const userAlreadyBanned = await prisma.ban.findFirst({
                where: {
                    userId: req.body.userId
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

banRouter.get(
    '/getWithToken',
    passport.authenticate('jwt',{session:false}),
    async (req, res) => {
        try {
            const { id } = req.user;
            console.log(`From banToken: ${id}`)
            const userBanInfo = await prisma.ban.findUnique({
                where: {
                    userId: id
                }
            });
            if (!userBanInfo) {
                res.status(200).send(false)
            } else {
                res.status(200).json(userBanInfo);
            }
        } catch (err) {
            res.status(400).json({
                message: `Error occurred when trying to check if current session user is banned.`,
                details: {
                    errorMessage: err.message,
                    errorStack: err.stack
                }
            });
        }
    }
);

banRouter.put(
    '/update/:userId',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const updateBan = await prisma.ban.update({
                where: {
                    userId: req.params.userId
                },
                data: req.body
            })
            if (!updateBan) {
                res.status(404).json({message: "Update on ban is unsuccessful"});
            }
            res.status(200).json(updateBan);
        } catch (err) {
            res.status(400).json({
                message: `Error occurred when trying to update ban.`,
                details: {
                    errorMessage: err.message,
                    errorStack: err.stack
                }
            });
        } finally {
            await prisma.$disconnect();
        }
    }
)

banRouter.delete(
    '/delete/:userId',
    async (req, res) => {
        try {
            const deletedBan = await prisma.ban.delete({
                where: {
                    userId: req.params.userId
                }
            })
            res.status(200).json({
                message: `User ${req.params.userId} successfully removed from ban table`,
                deletedBan
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: `Error occurred when trying to get unban user ${req.params.userId}`,
                details: {
                    errorMessage: error.message,
                    errorStack: error.stack,
                }
            });
        }
    }
)

banRouter.get(
    '/getAllPassedDate',
    async (req, res) => {
        try {
            const bans = await prisma.ban.findMany({
                where: {
                    banUntil: {
                        lte: new Date(Date.now())
                    }
                }
            })
            console.log(bans);
            let userIds = bans.map(ban => ban.userId);
            res.status(200).json(userIds);
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: `Error occurred when trying to get unban users`,
                details: {
                    errorMessage: error.message,
                    errorStack: error.stack,
                }
            });
        }
    }
);

banRouter.delete(
    '/deletePassedBanDate',
    async (req, res) => {
        try {
            const deletedBans = await prisma.ban.deleteMany({
                where: {
                    banUntil: {
                       lte: new Date(Date.now())
                    }
                }
            });
            res.status(200).json({
                message: `Successfully removed from users ban table`,
                deletedBans
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: `Error occurred when trying to get unban users`,
                details: {
                    errorMessage: error.message,
                    errorStack: error.stack,
                }
            });
        }
    }
)


module.exports = banRouter;
