const passport = require('passport');
const { PrismaClient } = require('@prisma/client')

const express = require('express');
const commentRouter = express.Router();
const prisma = require('../prismaClient');

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
    const prisma = new PrismaClient({ log: [ 'query' ]})
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

module.exports = commentRouter;