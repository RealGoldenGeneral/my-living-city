
const db = require('../db/models/index');
const express = require('express');
const roleRouter = express.Router();

// Models
const Role = db.Role;
const User = db.User;

roleRouter.get(
	'/getall',
	async (req, res, next) => {
		try {
			const roles = await Role.findAll();
			res.json(roles);
		} catch (error) {
			res.status(400).json({
				message: error.message,
				stack: error.stack,
			})
		}
	}
)

module.exports = roleRouter;