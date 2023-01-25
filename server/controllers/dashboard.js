const passport = require('passport');
const express = require('express');
const prisma = require('../lib/prismaClient');
const dashboardRouter = express.Router();

dashboardRouter.get(
  '/',
  passport.authenticate('jwt',{session:true}),
  async (req, res, next) => {
    try {
      const { id } = req.user;
      const test = await prisma.quarantine_Notifications.findMany({
        where: {
          user_id: id
        }
      });
      console.log(test);
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