
const express = require('express');
const roleRouter = express.Router();

roleRouter.get(
	'/getall',
	async (req, res, next) => {
		try {
			res.json({
				welcome: "to roles router"
			})
		} catch (error) {
			res.status(400).json({
				message: error.message,
				stack: error.stack,
			})
		}
	}
)

module.exports = roleRouter;