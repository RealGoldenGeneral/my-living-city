const passport = require('passport');
const db = require('../db/models/index');
const User = db.User;
const Role = db.Role;
const sequelize = db.sequelize;
const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../constants');

userRouter.get(
	'/test-secure',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		res.json({
			message: "You made it to the secure route",
			user: req.user,
			tokenQuery: req.query?.secret_token,
			tokenHeader: req.headers?.secret_token,
		})
	}
)

userRouter.post(
	'/signup',
	async (req, res, next) => {
		passport.authenticate('signup', (err, user, info) => {
			if (err) {
				res.status(500);
				res.json({
					message: err.message,
					stack: err.stack,
				});
				return;
			}

			if (!user) {
				console.log(info);
				res.status(401);
				res.json({
					message: info.message
				});
				return;
			}

			res.json(user);
		})(req, res, next);
	}
)

userRouter.post(
	'/login',
	async (req, res, next) => {
		passport.authenticate(
			'login',
			async (err, user, info) => {
				try {
					if (err) {
						res.status(400);
						return res.json({
							error: err,
							message: "An Error occured."
						});
					}

					if (!user) {
						res.status(400);
						return res.json({
							message: info.message
						});
					}

					req.login(
						user,
						{ session: false },
						async (error) => {
							if (error) return next(error);

							const tokenBody = { id: user.id, email: user.email };
							const token = jwt.sign({ user: tokenBody }, JWT_SECRET, {
								expiresIn: JWT_EXPIRY 
							});

							res.status(200);
							return res.json({
								user: user.toAuthJSON(),
								token,
							})
						}
					)
				} catch (error) {
					res.status(500);
					res.json({
						message: "An error occured",
						stack: error,
					})
				}
			}
		)(req, res, next);
	}
)


// TODO: Rewrite error and response payloads
//GET current route (required, only authenticated users have access)
const getCurrentUser = (req, res, next) => {
	const id = req.session.user.id;

	return User.findOne({
		include: [
			{
				model: Role,
				attributes: [ [ 'role_name', 'role_name' ] ]
			}
		],
		where: { id: id }
	}).then((user) => {
		if (!user) {
			return res.sendStatus(400);
		}

		return res.json({ user: user });
	});
};

const getRoles = async function(req, res) {
	try {
		var dbRoles = await Role.findAll().catch((err) => {
			throw err;
		});
		var roles = await Promise.all(
			dbRoles.map((role) => {
				return { role: role };
			})
		);
		res.send(roles);
	} catch (e) {
		return res.status(400).json({
			errors: {
				error: e.stack
			}
		});
	}
};

// TODO: Rewrite error and response payloads
//GET all users (required, only admin users have access)
const getUsers = async function(req, res) {
	try {
		var dbUsers = await User.findAll({
			include: [
				{
					model: Role,
					attributes: [ [ 'role_name', 'role_name' ] ]
				}
			]
		})
			/*
    .then((users) => {
      res.send(users)
    })
    */
			.catch((err) => {
				throw err;
			});
		var users = await Promise.all(
			dbUsers.map((user) => {
				return { user: user };
			})
		);
		res.send(users);
	} catch (e) {
		return res.status(400).json({
			errors: {
				error: e.stack
			}
		});
	}
};

// TODO: Rewrite error and response payloads try it in browser
// PUT change password route
const changePassword = async function(req, res) {
	console.log('changing password....');
	console.log(req.session.user.id);
	console.log(req.body);
	const id = req.session.user.id;
	const currentPassword = req.body.currentPassword;
	const newPassword = req.body.newPassword;

	try {
		const valid = await User.findByPk(id).then((user) => {
			console.log('found user');
			return user.validatePassword(currentPassword);
		});
		if (valid) {
			console.log('updating');
			await User.update(
				{
					password: newPassword
				},
				{
					where: {
						id: id
					},
					individualHooks: true
				}
			).catch((err) => {
				throw err;
			});

			console.log('updated');
			const user = await User.findByPk(id);
			console.log(user);
			req.session.user = user;
			res.status(200).end();
		} else {
			return res.status(500).send({ error: 'Incorrect password' });
		}
	} catch (e) {
		return res.status(400).json({
			errors: {
				error: e.stack
			}
		});
	}
};

// userRouter.get('/me', getCurrentUser);
// userRouter.get('/get-all', getUsers);
// userRouter.post('/register', register);
// userRouter.post('/login', login);
// userRouter.post('/logout', logout);
// userRouter.post('/logout', logout);
// userRouter.put('/password', changePassword);

module.exports = userRouter;
