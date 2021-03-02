require('dotenv').config();
const express = require('express');
const cors = require('cors');
// TODO: May be reason why logout not working
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const expressJWT = require('express-jwt'); // TODO: Also not used?
const { sequelize } = require('./db/models/index');
require('./config/passport');
const passport = require('passport');
const { validateLogin, auth: { optional, required }} = require('./middlewares/auth');

// Constants
const { __prod__ } = require('./constants');
const PORT = 3001;
const SESSION_SECRET = process.env.SESSION_SECRET;
const COOKIE_DOMAIN = __prod__ ? process.env.COOKIE_DOMAIN : `http://localhost:3001${PORT}`;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

const main = async () => {
	// Establish DB connection
  try {
    console.log('\nChecking connections...');
    await sequelize.authenticate();
    console.log("Database Connection has been established succesfully");
    sequelize.sync();
  } catch (error) {
    console.log("!!UNABLE TO CONNECT TO THE DATABASE!!\n", error);
  }

	// Initialize dependencies
	const app = express();

	// Apply middleware
  // app.use(passport.initialize());
  // app.use(passport.session());
	// app.use(cookieParser());
	app.use(express.json());
  app.use(cors({
    credentials: true,
    origin: CORS_ORIGIN,
  }))
  // Apply Passport middleware
  require('./auth/auth');


	// Routing
  const userRouter = require('./controllers/user');
  const roleRouter = require('./controllers/role');

  const apiRouter = express.Router();
  app.use("/", apiRouter);
  apiRouter.use("/user", userRouter);
  apiRouter.use('/role', roleRouter);

	// Listen to server
	app.listen(PORT, console.log(`Server running on PORT:${PORT}\n\n`));
};

main().catch((error) => {
	console.log(error);
});
