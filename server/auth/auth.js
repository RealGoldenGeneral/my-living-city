const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('../lib/constants');
const prisma = require('../lib/prismaClient');
const { argon2Hash, argon2ConfirmHash } = require('../lib/utilityFunctions');

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
        const { password } = req.body;
        if (!email) {
          return done({ message: "You must supply an email." })
        }

        if (!password) {
          return done({ message: "You must supply a password."})
        }

        // hash password
        const hashedPassword = await argon2Hash(password);

        // Check if user exists
        const userExists = await prisma.user.findUnique({
          where: { email }
        })
        if (userExists) {
          return done({ message: "User with that email already exists" })
          // return done(null, false, { message: "User with that email already exists" })
        }


        // Parse body
        const geoData = { ...req.body.geo }
        const addressData = { ...req.body.address }
        delete req.body.geo;
        delete req.body.address;

        // Create user
        const createdUser = await prisma.user.create({
          data: {
            geo: {
              create: geoData
            },
            address: {
              create: addressData
            },
            ...req.body,
            password: hashedPassword
          },
          include: {
            geo: true,
            address: true,
            userRole: true,
          }
        });

        return done(null, createdUser);
      } catch (error) {
        console.log("ERROR")
        done(error);
      } finally {
        await prisma.$disconnect();
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
        const foundUser = await prisma.user.findUnique({
          where: { email },
          // TODO: May cause unnecessary queries to database
          include: {
            geo: true,
            address: true,
            userRole: true,
          }
        });

        if (!foundUser) {
          console.log("User not found");
          return done(null, false, { message: `User with email ${email} could not be found!` });
        }

        // const validPassword = await foundUser.validatePassword(password);
        // console.log(validPassword);
        const validPassword = await argon2ConfirmHash(password, foundUser.password);
        if (!validPassword) {
          return done(null, false, { message: "Invalid password. Please try again."})
        }

        const parsedUser = {
          ...foundUser,
          password: null,
        }

        return done(null, parsedUser, { message: "Logged in succesfully" });
      } catch (error) {
        console.log("Error is thrown", error)
        return done(error);
      } finally {
        await prisma.$disconnect();
      }
    }
  )
)

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  new JWTStrategy(
    {
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromExtractors([
        ExtractJWT.fromUrlQueryParameter('secret_token'),
        ExtractJWT.fromHeader('secret_token'),
        ExtractJWT.fromAuthHeaderAsBearerToken(),
      ])
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
)