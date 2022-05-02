const passport = require('passport');

const express = require('express');
const proposalRouter = express.Router();
const prisma = require('../lib/prismaClient');
const { checkIdeaThresholds } = require('../lib/prismaFunctions');
const { isInteger, isEmpty } = require('lodash');

const fs = require('fs');

const multer = require('multer');

//multer storage policy, including file destination and file naming policy
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/ideaImage');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

//file filter policy, only accept image file
const theFileFilter = (req, file, cb) => {
    console.log(file);
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/tiff' || file.mimetype === 'image/webp' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('file format not supported'), false);
    }
}

//const variable for 10MB max file size in bytes
const maxFileSize = 10485760;

//multer upload project, setting receiving mode and which key components to use
const upload = multer({ storage: storage, limits: { fileSize: maxFileSize }, fileFilter: theFileFilter }).single('imagePath');


// post request to create an idea
proposalRouter.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            console.log("req.body", req);
            res.status(200).json(req.body);
        } catch (error) {
            console.error(error);
            res.status(400).json({
                message: "An error occured while trying to create an Idea.",
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

proposalRouter.get(
    '/',
    async (req, res, next) => {
        try {
            res.json({
                route: 'welcome to Proposal Router'
            })
        } catch (error) {
            res.status(400).json({
                message: error.message,
                details: {
                    errorMessage: error.message,
                    errorStack: error.stack,
                }
            })
        }
    }
)

// Get all Proposals
proposalRouter.get(
    '/getAll',
    async (req, res, next) => {
        try {
            const proposals = await prisma.proposal.findMany({
                include: {
                    idea:
                    {
                        include: {
                            ratings: true,
                        }
                    }
                }
            });
            res.json(proposals);
        } catch (error) {
            res.status(400).json({
                message: error.message,
                details: {
                    errorMessage: error.message,
                    errorStack: error.stack,
                }
            })
        }
    }
)

// Get all proposals with aggregations
proposalRouter.post(
    '/getall/with-sort',
    async (req, res, next) => {
        try {
            console.log(req.body);
            const allProposals = await prisma.proposal.findMany(req.body);

            res.status(200).json(allProposals);
        } catch (error) {
            res.status(400).json({
                message: "An error occured while trying to fetch all ideas",
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

proposalRouter.post(
    '/getall/aggregations',
    async (req, res, next) => {
        try {
            const proposals = await prisma.proposal.findMany({
                include: {
                    idea: {
                        include: {
                            ratings: true,
                        },
                    },
                },
            });
            res.json(proposals);
        } catch (error) {
            res.status(400).json({
                message: error.message,
                details: {
                    errorMessage: error.message,
                    errorStack: error.stack,
                }
            })
        }
    }
)

// Get all idea as well as relations with ideaId
proposalRouter.get(
    '/get/:proposalId',
    async (req, res, next) => {
        try {
            const parsedProposalId = parseInt(req.params.proposalId);

            // check if id is valid
            if (!parsedProposalId) {
                return res.status(400).json({
                    message: `A valid ideaId must be specified in the route parameter.`,
                });
            }

            const foundProposal = await prisma.proposal.findUnique({
                where: { id: parsedProposalId },
                include: {
                    suggestedIdeas: {
                        select: {
                            id: true,
                            title: true,
                            author: {
                                select: {
                                    fname: true,
                                    lname: true,
                                }
                            }
                        },
                    },

                },

            });
            if (!foundProposal) {
                return res.status(400).json({
                    message: `The idea with that listed ID (${parsedProposalId}) does not exist.`,
                });
            }

            const result = { ...foundProposal };

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(400).json({
                message: `An Error occured while trying to fetch idea with id ${req.params.ideaId}.`,
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


// Put request to update data
proposalRouter.put(
    '/update/:ideaId',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const { email, id: loggedInUserId } = req.user;
            const { ideaId } = req.params;
            const parsedProposalId = parseInt(ideaId);
            const {
                title,
                description,
                communityImpact,
                natureImpact,
                artsImpact,
                energyImpact,
                manufacturingImpact,
                // TODO: If these fields are not passed will break code
                geo: {
                    lat,
                    lon
                },
                address: {
                    streetAddress,
                    streetAddress2,
                    city,
                    country,
                    postalCode,
                },
            } = req.body;

            if (!ideaId || !parsedProposalId) {
                return res.status(400).json({
                    message: `A valid ideaId must be specified in the route paramater.`,
                });
            }

            // Check to see if idea with id exists
            const foundProposal = await prisma.idea.findUnique({ where: { id: parsedProposalId } });
            if (!foundProposal) {
                return res.status(400).json({
                    message: `The idea with that listed ID (${ideaId}) does not exist.`,
                });
            }

            // Check to see if Proposal is the requestee's idea by JWT
            const ideaOwnedByUser = foundProposal.authorId === loggedInUserId;
            if (!ideaOwnedByUser) {
                return res.status(401).json({
                    message: `The user ${email} is not the author or an admin and therefore cannot edit this idea.`
                });
            }

            // Conditional add params to update only fields passed in 
            const updateGeoData = {
                ...lat && { lat },
                ...lon && { lon }
            }

            const updateAddressData = {
                ...streetAddress && { streetAddress },
                ...streetAddress2 && { streetAddress2 },
                ...city && { city },
                ...country && { country },
                ...postalCode && { postalCode },
            }

            const updateData = {
                ...title && { title },
                ...description && { description },
                ...communityImpact && { communityImpact },
                ...natureImpact && { natureImpact },
                ...artsImpact && { artsImpact },
                ...energyImpact && { energyImpact },
                ...manufacturingImpact && { manufacturingImpact },
            };

            const updatedProposal = await prisma.idea.update({
                where: { id: parsedProposalId },
                data: {
                    geo: { update: updateGeoData },
                    address: { update: updateAddressData },
                    ...updateData,
                },
                include: {
                    geo: true,
                    address: true,
                }
            });

            console.log("Returns here")
            res.status(200).json({
                message: "Proposal succesfully updated",
                idea: updatedProposal,
            })
        } catch (error) {
            res.status(400).json({
                message: "An error occured while to update an Proposal",
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


// delete request to delete an idea
proposalRouter.delete(
    '/delete/:ideaId',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const { id: loggedInUserId, email } = req.user;
            console.log(req.user);
            const parsedProposalId = parseInt(req.params.ideaId);

            // check if id is valid
            if (!parsedProposalId) {
                return res.status(400).json({
                    message: `A valid ideaId must be specified in the route paramater.`,
                });
            }

            // Check to see if idea exists
            const foundProposal = await prisma.idea.findUnique({ where: { id: parsedProposalId } });
            if (!foundProposal) {
                return res.status(400).json({
                    message: `The idea with that listed ID (${ideaId}) does not exist.`,
                });
            }

            // Check to see if idea is owned by user
            const ideaOwnedByUser = foundProposal.authorId === loggedInUserId;
            if (!ideaOwnedByUser) {
                return res.status(401).json({
                    message: `The user ${email} is not the author or an admin and therefore cannot delete this idea.`
                });
            }

            if (foundProposal.imagePath) {
                if (fs.existsSync(foundProposal.imagePath)) {
                    fs.unlinkSync(foundProposal.imagePath);
                }
            }

            const deleteComment = await prisma.ideaComment.deleteMany({ where: { ideaId: foundProposal.id } });
            const deleteRating = await prisma.ideaRating.deleteMany({ where: { ideaId: foundProposal.id } });

            const deletedGeo = await prisma.ideaGeo.deleteMany({ where: { ideaId: foundProposal.id } });
            const deleteAddress = await prisma.ideaAddress.deleteMany({ where: { ideaId: foundProposal.id } });
            const deletedProposal = await prisma.idea.delete({ where: { id: parsedProposalId } });

            res.status(200).json({
                message: "Proposal succesfully deleted",
                deletedProposal: deletedProposal,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: "An error occured while to delete an Proposal",
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

module.exports = proposalRouter;