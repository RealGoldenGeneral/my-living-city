const passport = require('passport');
const express = require('express');
const banCommentRouter = express.Router();
const prisma = require('../lib/prismaClient');

banCommentRouter.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const { id } = req.user;
            const foundComment = await prisma.ideaComment.findUnique({ where: { id: req.body.commentId } });
            if (!foundComment) {
                return res.status(400).json({
                    message: `The comment (${req.body.commentId}) does not exist.`,
                });
            }
            const createdBan = await prisma.commentBan.create({
                data: {
                    commentId: req.body.commentId,
                    authorId: req.body.authorId,
                    banMessage: req.body.banMessage,
                    bannedBy: id,
                }
            });
            res.status(200).json({
                message: `Successfully banned comment ${req.body.commentId}`,
                createdBan
            });
        } catch (error) {
            console.log(error.message);
            res.status(400).json({
                message: `Error occurred when trying to ban comment ${req.body.commentId}`,
                details: {
                    errorMessage: error.message,
                    errorStack: error.stack,
                }
            });
        }
    }
)

module.exports = banCommentRouter;