const passport = require('passport');
const db = require('../db/models/index');
const Report = db.Report;

const express = require('express');
const reportRouter = express.Router();

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

module.exports = reportRouter;