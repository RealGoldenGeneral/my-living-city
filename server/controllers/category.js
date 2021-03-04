const passport = require('passport');
const { PrismaClient } = require('@prisma/client')

const express = require('express');
const categoryRouter = express.Router();

categoryRouter.get(
  '/',
  async (req, res, next) => {
    try {
      res.json({
        route: 'welcome to Category Router'
      })
    } catch (error) {
			res.status(400).json({
				message: error.message,
				stack: error.stack,
			})
    }
  }
)

categoryRouter.get(
  '/getall',
  async (req, res, next) => {
    const prisma = new PrismaClient({ log: [ 'query' ]})
    try {
      const allIdeas = await prisma.idea.findMany();

      res.status(200).json(allIdeas);
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

module.exports = categoryRouter;