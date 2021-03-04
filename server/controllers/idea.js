const passport = require('passport');
const { PrismaClient } = require('@prisma/client')

const express = require('express');
const ideaRouter = express.Router();

ideaRouter.get(
  '/',
  async (req, res, next) => {
    try {
      res.json({
        route: 'welcome to Idea Router'
      })
    } catch (error) {
			res.status(400).json({
				message: error.message,
				stack: error.stack,
			})
    }
  }
)

ideaRouter.get(
  '/getall',
  async (req, res, next) => {
    const prisma = new PrismaClient({ log: [ 'query' ]})
    try {
      const allCategories = await prisma.category.findMany();

      res.status(200).json(allCategories);
    } catch (error) {
      res.status(400).json({
        message: "An error occured while trying to fetch all categories",
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

ideaRouter.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const prisma = new PrismaClient({ log: [ 'query' ]})
    try {
      // passport middleware provides this based on JWT
      const { email, id } = req.user;
      const { categoryId } = req.body;

      // Check if category id is added
      if (!categoryId) {
        return res.status(400).json({
          message: 'An Idea must be under a specific category.',
          details: {
            errorMessage: 'Creating an idea must be explicityly supplied with a "categoryId" field.',
            errorStack: '"CategoryId" must be defined in the body with a valid id found in the database.',
          }
        })
      }

      const ideaData = {
        ...req.body,
        authorId: id
      };

      // Create an idea and make the author JWT bearer
      const createdIdea = await prisma.idea.create({
        data: ideaData
      });

      res.status(201).json({
        createdIdea
      });
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

module.exports = ideaRouter;