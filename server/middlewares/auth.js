const jwt = require('express-jwt');

const validateLogin = function(req, res, next) {
  var session = req.session;
  console.log(session);
  if (session.user) {
    next();
  } else {
    res.status(401)
    res.json({
      error: {
        type: "Unauthorized",
        message: "You must be authorized, please login."
      }
    })
  }
}

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if(authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

const getTokenFromCookie = (req) => {
    return req.cookies.authToken;
};

const auth = {
  required: jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    getToken: getTokenFromCookie,
    algorithms: ['HS256']
  }),
  optional: jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    getToken: getTokenFromCookie,
    credentialsRequired: false,
    algorithms: ['HS256']
  }),
};

module.exports = {
  validateLogin,
  auth,
}