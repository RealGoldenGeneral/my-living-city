
const db = require('../db/models/index');
const express = require('express');
const roleRouter = express.Router();

// Models
const Role = db.Role;
const User = db.User;

roleRouter.get('/get-all', async (req, res) => {
	try {
		const hashedPassword = await User.cryptPassword('password');
		console.log(hashedPassword);

    const dbRoles = await Role.findAll();
    res.json(dbRoles);
	} catch (e) {
		res.status(400).json({
			errors: [
				{
					type: 'Request',
					message: `${error}`,
          stack: e.stack,
				}
			]
		});
	}
});

module.exports = roleRouter;