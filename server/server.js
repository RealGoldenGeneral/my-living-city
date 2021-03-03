require('dotenv').config();
const express = require('express');
const cors = require('cors');
// TODO: May be reason why logout not working

// Constants
// const { __prod__ } = require('./constants');
const PORT = 3001;
// const SESSION_SECRET = process.env.SESSION_SECRET;
// const COOKIE_DOMAIN = __prod__ ? process.env.COOKIE_DOMAIN : `http://localhost:${PORT}`;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

const main = async () => {
	// Initialize dependencies
	const app = express();

	// Apply middleware
	app.use(express.json());
  app.use(cors({
    credentials: true,
    origin: CORS_ORIGIN,
  }))
  require('./auth/auth');


	// Routing
  const userRouter = require('./controllers/user');
  const roleRouter = require('./controllers/role');
  const reportRouter = require('./controllers/report');
  const commentRouter = require('./controllers/comment');
  const blogRouter = require('./controllers/blog');
  const ideaRouter = require('./controllers/idea');
  const imageRouter = require('./controllers/image');

  const apiRouter = express.Router();
  app.use("/", apiRouter);
  apiRouter.use("/user", userRouter);
  apiRouter.use('/role', roleRouter);
  apiRouter.use('/report', reportRouter);
  apiRouter.use('/comment', commentRouter);
  apiRouter.use('/blog', blogRouter);
  apiRouter.use('/idea', ideaRouter);
  apiRouter.use('/image', imageRouter);

	// Listen to server
	app.listen(PORT, console.log(`Server running on PORT:${PORT}\n\n`));
};

main().catch((error) => {
	console.log(error);
});
