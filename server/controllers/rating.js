const passport = require('passport');

const express = require('express');
const ideaRatingRouter = express.Router();
const prisma = require('../lib/prismaClient');
const {
  PROPOSAL_RATING_AVG, 
  PROPOSAL_RATING_COUNT, 
  PROJECT_RATING_AVG, 
  PROJECT_RATING_COUNT 
} = require('../lib/constants');

ideaRatingRouter.get(
  '/',
  async (req, res, next) => {
    try {
      res.json({
        route: 'welcome to the Idea Rating Router'
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

ideaRatingRouter.get(
  '/getall',
  async (req, res, next) => {
    try {
      const allIdeaRating = await prisma.ideaRating.findMany();

      res.status(200).json(allIdeaRating);
    } catch (error) {
      res.status(400).json({
        message: "An error occured while trying to fetch all Idea Ratings",
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

// Get all ratings under idea id
ideaRatingRouter.get(
  '/getall/:ideaId',
  async (req, res, next) => {
    try {
      const parsedIdeaId = parseInt(req.params.ideaId);

      // check if id is valid
      if (!parsedIdeaId) {
        return res.status(400).json({
          message: `A valid ideaId must be specified in the route paramater.`,
        });
      }

      const ratings = await prisma.ideaRating.findMany({ where: { ideaId: parsedIdeaId }});

      res.status(200).json(ratings);
    } catch (error) {
      res.status(400).json({
        message: `An error occured while trying to fetch all ratings under idea ${req.params.ideaId}.`,
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

// Create a rating under an idea
ideaRatingRouter.post(
  '/create/:ideaId',
	passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { email, id: loggedInUserId } = req.user;
      const { rating, ratingExplanation } = req.body;
      const parsedIdeaId = parseInt(req.params.ideaId);

      // check if id is valid
      if (!parsedIdeaId) {
        return res.status(400).json({
          message: `A valid ideaId must be specified in the route paramater.`,
        });
      }

      const foundIdea = await prisma.idea.findUnique({ where: { id: parsedIdeaId }});
      if (!foundIdea) {
        return res.status(400).json({
          message: `The idea with that listed ID (${ideaId}) does not exist.`,
        });
      }

      // Check if user already submitted rating under "idea"
      const userAlreadyCreatedRating = await prisma.ideaRating.findFirst({
        where: { 
          authorId: loggedInUserId,
          ideaId: parsedIdeaId,
        }
      });
      if (userAlreadyCreatedRating) {
        return res.status(400).json({
          message: `You have already rated this idea. You cannot rate an idea twice.`,
          details: {
            errorMessage: "A rating can only be voted on once."
          }
        });
      }

      const createdRating = await prisma.ideaRating.create({ data: {
        rating,
        ratingExplanation,
        authorId: loggedInUserId,
        ideaId: parsedIdeaId,
      }});

      // Check if ideas have exceeded threshold count as well as average
      const aggregations = await prisma.ideaRating.aggregate({
        where: {
          ideaId: parsedIdeaId
        },
        avg: {
          rating: true
        },
        count: true
      });

      const ratingAverage = aggregations?.avg.rating;
      const ratingCount = aggregations?.count;

      let updatedIdea = null;
      // Advance Idea to Proposal if thresholds are met 
      if (
        PROPOSAL_RATING_AVG <= ratingAverage &&
        PROPOSAL_RATING_COUNT <= ratingCount &&
        (
          foundIdea.state !== 'PROPOSAL' ||
          foundIdea.state !== 'PROJECT'
        )
      ) {
        console.log("Updating idea to Proposal state");
        updatedIdea = await prisma.idea.update({
          where: { id: parsedIdeaId },
          data: {
            state: 'PROPOSAL',
            proposalInfo: {
              create: {
                description: 'Proposal has been initialized',
              },
            },
          },
        });
      }

      // Advance Proposal to Project if Thresholds and conditions are met
      if (
        PROJECT_RATING_AVG <= ratingAverage &&
        PROJECT_RATING_COUNT <= ratingCount &&
        foundIdea.state !== 'PROJECT'
        // TODO: check if someone is championing idea state checker
      ) {
        console.log("Updating idea to Project state");
        updatedIdea = await prisma.idea.update({
          where: { id: parsedIdeaId },
          data: {
            state: 'PROJECT',
            projectInfo: {
              create: {
                description: 'Project has been initialized.'
              }
            }
          }
        })
      }

      res.status(200).json({
        message: `Rating succesfully created under Idea ${parsedIdeaId}`,
        rating: createdRating,
        updatedIdea,
      });
    } catch (error) {
      res.status(400).json({
        message: `An error occured while trying to create a rating for idea ${req.params.ideaId}.`,
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

// Create a rating under an idea
ideaRatingRouter.put(
  '/update/:ratingId',
	passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { email, id: loggedInUserId } = req.user;
      const { rating, ratingExplanation } = req.body;
      const parsedRatingId = parseInt(req.params.ratingId);

      // check if id is valid
      if (!parsedRatingId) {
        return res.status(400).json({
          message: `A valid ratingId must be specified in the route paramater.`,
        });
      }

      // Check to see if rating exists
      const foundRating = await prisma.ideaRating.findUnique({ where: { id: parsedRatingId }});
      if (!foundRating) {
        return res.status(400).json({
          message: `The rating with the listed ID (${commentId}) does not exist.`,
        });
      }

      // Check if rating is owned by requestee
      const ratingOwnedByUser = foundRating.authorId === loggedInUserId;
      if (!ratingOwnedByUser) {
        return res.status(401).json({
          message: `The user ${email} is not the author or an admin and therefore cannot edit this rating.`
        });
      }

      // Conditional add params to update only fields passed in 
      const updateData = {
        ...rating && { rating }, // TODO: 0 is valid input and is also falsy will not be updated
        ...ratingExplanation && { ratingExplanation }
      };

      const updatedRating = await prisma.ideaRating.update({
        where: { id: parsedRatingId },
        data: updateData
      });

      res.status(200).json({
        message: "Rating succesfully updated",
        rating: updatedRating,
      });
    } catch (error) {
      res.status(400).json({
        message: `An error occured while trying to edit rating ${req.params.ratingId}.`,
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

// delete a rating by ID
ideaRatingRouter.delete(
  '/delete/:ratingId',
	passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { email, id: loggedInUserId } = req.user;
      const parsedRatingId = parseInt(req.params.ratingId);

      // check if id is valid
      if (!parsedRatingId) {
        return res.status(400).json({
          message: `A valid ratingId must be specified in the route paramater.`,
        });
      }

      // Check to see if comment exists
      const foundRating = await prisma.ideaRating.findUnique({ where: { id: parsedRatingId }});
      if (!foundRating) {
        return res.status(400).json({
          message: `The rating with the listed ID (${commentId}) does not exist.`,
        });
      }

      // Check if comment is requestee's comment
      const ratingOwnedByUser = foundRating.authorId === loggedInUserId;
      if (!ratingOwnedByUser) {
        return res.status(401).json({
          message: `The user ${email} is not the author or an admin and therefore cannot delete this comment.`
        });
      }

      const deletedRating = await prisma.ideaRating.delete({ where: { id: parsedRatingId }});

      res.status(200).json({
        message: "Rating succesfully deleted",
        deletedRating,
      });
    } catch (error) {
      res.status(400).json({
        message: `An error occured while trying to delete rating ${req.params.ratingId}.`,
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

ideaRatingRouter.get(
  '/check/:ideaId',
  async (req, res, next) => {
    try {
      const parsedIdeaId = parseInt(req.params.ideaId);
      const aggregations = await prisma.ideaRating.aggregate({
        where: {
          ideaId: parsedIdeaId,
        },
        avg: {
          rating: true,
        },
        count: true,
      });
      res.status(200).json(aggregations);
    } catch (error) {
      res.status(400).json({
        message: `An error occured while trying to check the ratings of idea #${req.params.ideaId}.`,
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

module.exports = ideaRatingRouter;