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


/**
 * Test route to ensure JWT tokens are being parsed correctly
 * 
 * @route			GET /user/test-secure
 * @access		Private (Signued up User with JWT)
 */
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

/**
 * Based on user JWT checks if it is valid and returns who
 * the JWT is referencing or "logged in" as.
 * 
 * @route			GET /user/me
 * @access		Private (Signued up User with JWT)
 */
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

			if (!foundUser) {
				return res.status(400).json({
					message: "User could not be found or does not exist in the database."
				})
			}

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

/**
 * Signs up a user with fields referenced in the User DB model.
 * At a minimum must have email and password to succeed.
 * 
 * @route			POST /user/signup
 * @access		Public (No credentials required)
 * @returns		{{ User, JWT }}
 */
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

/**
 * Logs in user with email and password and issues a JWT.
 * 
 * @route			POST /user/login
 * @access		Public (No credentials required)
 * @returns		{{ User, JWT }}
 */
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

// TODO: Limit return payload so that only id is returned?
/**
 * Grabs all users and their respective roles without User password
 * 
 * @route			GET /user/getall
 * @access		Public (No credentials required)
 * @returns 	{ [User] }
 */
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

/**
 * Based on user JWT checks if it is valid and returns who
 * the JWT is referencing or "logged in" as.
 * 
 * @route			GET /user/me
 * @access		Private (Signued up User with JWT)
 * @returns 	{ message, User, validPassword }
 */
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

module.exports = userRouter;
