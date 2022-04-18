const passport = require('passport');

const express = require('express');
const communityRouter = express.Router();
const prisma = require('../lib/prismaClient');
const { isInteger, isEmpty } = require('lodash');

const fs = require('fs');

// post request to create a collaborator
communityRouter.post(
    '/create/collaborator/:proposalId',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const { email, id: loggedInUserId } = req.user;
            const { content } = req.body;
            const parsedProposalId = parseInt(req.params.proposalId);

            // check if id is valid
            if (!parsedProposalId) {
                return res.status(400).json({
                    message: `A valid ideaId must be specified in the route paramater.`,
                });
            }

            const foundProposal = await prisma.proposal.findUnique({ where: { id: parsedProposalId } });
            if (!foundProposal) {
                return res.status(400).json({
                    message: `The idea with that listed ID (${parsedProposalId}) does not exist.`,
                });
            }

            const createdCollaborator = await prisma.collaborator.create({
                data: {
                    author: loggedInUserId,
                    proposal: parsedProposalId,
                    experience: content,
                    role: 'collaborator',
                },
            });



            res.status(200).json(createdCollaborator);
        } catch (error) {
            res.status(400).json({
                message: `An error occured while trying to create a comment for idea ${req.params.proposalId}.`,
                details: {
                    errorMessage: error.message,
                    errorStack: error.stack,
                }
            });
        } finally {
            await prisma.$disconnect();
        }
    }

)
module.exports = communityRouter;