const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const db = require('../db/models/index');
const User = db.User;
const Role = db.Role;

passport.use(
  'signup',
  new localStrategy.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const userCredentials = req.body;

        // Check if user exists
        const userExists = await User.findOne({
          where: {
            email: email
          }
        });
        if (userExists) {
          return done({ message: "User with that email already exists" })
          // return done(null, false, { message: "User with that email already exists" })
        }

        // Create user
        const createdUser = await User.create(userCredentials);

        return done(null, createdUser.toAuthJSON());
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const foundUser = await User.findOne({
          where: {
            email
          }
        });

        if (!foundUser) {
          console.log("User not found");
          return done(null, false, { message: `User with email ${email} could not be found!` });
        }

        const validPassword = await foundUser.validatePassword(password);
        console.log(validPassword);
        if (!validPassword) {
          return done(null, false, { message: "Invalid password. Please try again."})
        }

        return done(null, foundUser, { message: "Logged in succesfully" });
      } catch (error) {
        console.log("Error is thrown", error)
        return done(error);
      }
    }

  )
)