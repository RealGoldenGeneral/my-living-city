const passport = require('passport');
const db = require('../db/models/index');
const Idea = db.Idea;

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

module.exports = ideaRouter;