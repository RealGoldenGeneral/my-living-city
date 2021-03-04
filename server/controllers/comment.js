const passport = require('passport');
const { PrismaClient } = require('@prisma/client')

const express = require('express');
const commentRouter = express.Router();
const prisma = require('../lib/prismaClient');

commentRouter.get(
  '/',
  async (req, res, next) => {
    try {
      res.json({
        route: 'welcome to comment Router'
      })
    } catch (error) {
			res.status(400).json({
				message: error.message,
				stack: error.stack,
			})
    }
  }
)

commentRouter.get(
  '/getall',
  async (req, res, next) => {
    try {
      const allIdeaComments = await prisma.ideaComment.findMany();

      res.status(200).json(allIdeaComments);
    } catch (error) {
      res.status(400).json({
        message: "An error occured while trying to fetch all Idea Comments.",
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

// Get all under idea id
commentRouter.get(
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

      // TODO: might not be necessary?
      // // Check if idea exists
      // const foundIdea = await prisma.idea.findUnique({ where: { id: parsedIdeaId }});
      // if (!foundIdea) {
      //   return res.status(400).json({
      //     message: `The idea with that listed ID (${ideaId}) does not exist.`,
      //   });
      // }

      const comments = await prisma.ideaComment.findMany({ where: { ideaId: parsedIdeaId }});

      res.status(200).json(comments);
    } catch (error) {
      res.status(400).json({
        message: `An error occured while trying to fetch all comments under idea ${req.params.ideaId}.`,
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

// Create a comment under an idea
commentRouter.post(
  '/create/:ideaId',
	passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { email, id: loggedInUserId } = req.user;
      const { content } = req.body;
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

      const createdComment = await prisma.ideaComment.create({ data: {
        content,
        authorId: loggedInUserId,
        ideaId: parsedIdeaId,
      }});

      res.status(200).json({
        message: `Comment succesfully created under Idea ${parsedIdeaId}`,
        comment: createdComment
      });
    } catch (error) {
      res.status(400).json({
        message: `An error occured while trying to create a comment for idea ${req.params.ideaId}.`,
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

// commentRouter.get(
//   '/getall/:ideaId',
//   async (req, res, next) => {
//     try {
      
//     } catch (error) {
      
//     } finally {
//       await prisma.$disconnect();
//     }
//   }
// )

module.exports = commentRouter;