const passport = require('passport');
const { PrismaClient } = require('@prisma/client')

const express = require('express');
const ideaRatingRouter = express.Router();
const prisma = require('../lib/prismaClient');

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
				stack: error.stack,
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

module.exports = ideaRatingRouter;