const passport = require('passport');
const { PrismaClient } = require('@prisma/client')

const express = require('express');
const reportRouter = express.Router();
const prisma = require('../lib/prismaClient');

reportRouter.get(
  '/',
  async (req, res, next) => {
    try {
      res.json({
        route: 'welcome to report Router'
      })
    } catch (error) {
			res.status(400).json({
				message: error.message,
				stack: error.stack,
			})
    }
  }
)

reportRouter.get(
  '/getall',
  async (req, res, next) => {
    try {
      const allReports = await prisma.report.findMany();

      res.status(200).json(allReports);
    } catch (error) {
      res.status(400).json({
        message: "An error occured while trying to fetch all reports",
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

module.exports = reportRouter;