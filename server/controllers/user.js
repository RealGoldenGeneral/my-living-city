const passport = require('passport');
const db = require('../db/models/index');
const User = db.User;
const Role = db.Role;
const sequelize = db.sequelize;
const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../constants');
const argon2 = require('argon2');


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

userRouter.get(
	'/me',
	passport.authenticate('jwt', { session: false }),
	async (req, res, next) => {
		try {
			const { id, email } = req.user;
			const foundUser = await User.findOne({
				include: {
					model: Role,
					attributes: [ [ 'role_name', 'role_name' ] ]
				},
				attributes: {
					exclude: [ 'password' ]
				},
				where: {
					id
				}
			})

			res.status(200);
			res.json({
				user: foundUser,
			})
		} catch (error) {
			res.status(500);
			res.json({
				message: error.message,
				stack: error.stack,
			})
		}
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

			// Give valid token upon signup
			const tokenBody = { id: user.id, email: user.email };
			const token = jwt.sign({ user: tokenBody }, JWT_SECRET, {
				expiresIn: JWT_EXPIRY 
			});

			res.status(201).json({
				user,
				token,
			});
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

userRouter.get(
	'/roles',
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

userRouter.get(
	'/getall',
	async (req, res, next) => {
		try {
			const allUsers = await User.findAll({
				include: {
					model: Role,
					attributes: [ [ 'role_name', 'role_name' ] ]
				},
				attributes: {
					exclude: [ 'password' ]
				}
			});

			res.json(allUsers);
		} catch (error) {
			res.status(400).json({
				message: error.message,
				stack: error.stack,
			})
		}
	}
)

userRouter.post(
	'/password',
	passport.authenticate('jwt', { session: false }),
	async (req, res, next) => {
		try {
			const { id, email } = req.user;
			const { originalPassword, newPassword } = req.body;
			const foundUser = await User.findByPk(id);

			const validPassword = await argon2.verify(foundUser.password, originalPassword);

			if (!validPassword) {
				throw new Error('The provided password is not correct');
			}

			await User.update(
				{ password: newPassword },
				{
					where: {
						id
					},
					individualHooks: true
				}
			);

			const reQueriedUser = await User.findByPk(id);

			res.json({
				message: "User succesfully updated",
				user: reQueriedUser.toAuthJSON(),
				validPassword
			});
		} catch (error) {
			res.status(400).json({
				message: error.message,
				stack: error.stack,
			})
		}
	}
)


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

module.exports = userRouter;
