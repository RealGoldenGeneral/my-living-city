
const express = require('express');
const prisma = require('../lib/prismaClient');
const dashboardRouter = express.Router();

dashboardRouter.get(
  '/test',
  async (req, res, next) => {
    try {
      const test = await prisma.quarantine_Notifications.findMany();
      res.send(test);
    }
    catch (error) {
      res.status(400).json({
        message: error.message,
        details: {
          errorMessage: error.message,
          errorStack: error.stack,
        }
      });
    }
  }
)

module.exports = dashboardRouter;