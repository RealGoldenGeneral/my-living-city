const passport = require('passport');

const express = require('express');
const communityRouter = express.Router();
const prisma = require('../lib/prismaClient');
const { isInteger, isEmpty } = require('lodash');

const fs = require('fs');

// post request to create a collaborator
communityRouter.post(
    '/create/collaborator',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {

            console.log('create collaborator');

            const { id: loggedInUserId } = req.user;
            const {
                proposalId,
                experience,
                role,
                time,
                contactInfo,
            } = req.body;

            console.log("collabValues: ", proposalId, experience, role, time, contactInfo);

            const parsedProposalId = parseInt(proposalId);

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

            const createdCollaborator = await prisma.collaborator.upsert({
                where: {
                    authorId: loggedInUserId,
                },
                update: {
                    experience: experience,
                    role: role,
                    time: time,
                    contactInfo: contactInfo,
                },
                create: {
                    authorId: loggedInUserId,
                    proposalId: parsedProposalId,
                    experience: experience,
                    role: role,
                    time: time,
                    contactInfo: contactInfo,
                },
            });



            res.status(200).json(createdCollaborator);

        } catch (error) {
            res.status(400).json({
                message: `You are already collaborating on this idea.`,
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

communityRouter.get(
    '/collaborators/getAll/:proposalId',
    async (req, res, next) => {
        try {
            const { proposalId } = req.params;
            const parsedProposalId = parseInt(proposalId);
            const collaborators = await prisma.collaborator.findMany({
                where: {
                    proposalId: parsedProposalId,
                },
            });
            res.status(200).json(collaborators);
        } catch (error) {
            res.status(400).json({
                message: `Cannot get collaborators.`,
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