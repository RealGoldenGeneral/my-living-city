const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('../db/models/index');
const User = db.User;
const Role = db.Role;
const sequelize = db.sequelize;




//POST new user route (optional, everyone has access)
const register = (req, res, next) => {
  const { body: { user } } = req;

  User.findOne({ where: {email: user.email} }).then(existingUser => {
    if (existingUser != null) {
      return res.status(409).json({
        errors: {
          email: 'already exists',
        },
      });
    } else {
      if(!user.email) {
        return res.status(422).json({
          errors: {
            email: 'is required',
          },
        });
      }
      if(!user.password) {
        return res.status(422).json({
          errors: {
            password: 'is required',
          },
        });
      }
      User.create(user)
        .then((user) => res.json({'user': user.toAuthJSON() }));
      }
  });
};

//POST login route (optional, everyone has access)
const login = (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: true }, (err, passportUser, info) => {
    /*******DEBUG*********/
    console.log("Authenticating...");
    /********************/

    if(err) {
      return next(err);
    }

    if(passportUser) {
      /*******DEBUG*********/
      console.log("Valid user found");
      /********************/

      const user = passportUser;
      req.session.user = passportUser;
      console.log(req.session);
      //user.token = passportUser.generateJWT();
      req.session.user = user;
      return res.send( {user: user});
      /*
      res.cookie('authToken', user.token, { 
        maxAge: 30 * 60 * 60 * 24 * 1000  // 30 days in ms
      });
      */
      //return res.json({ user: user.toAuthJSON() });
    }

    return res.status(400).info;
  })(req, res, next);
};

const logout = (req, res, next) => {
  req.session.destroy();
  res.clearCookie('authToken');
  res.clearCookie('connect.sid');
  res.status(200).end();
};

//GET current route (required, only authenticated users have access)
const getCurrentUser = (req, res, next) => {
  const id = req.session.user.id;

  return User.findOne({
    include: [{
      model: Role,
      attributes: [
        ['role_name', 'role_name']
      ]
    }],
    where: {id: id}
  })
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user });
    });
};

const getRoles = async function(req, res) {
  try{
  var dbRoles = await Role.findAll()
  .catch((err) => {throw err;});
  var roles = await Promise.all(dbRoles.map(role => { return {"role": role} }));
  res.send(roles);
  }
  catch(e){
    return res.status(400).json({
      errors: {
        error: e.stack
      },
    });
  }
}


//GET all users (required, only admin users have access)
const getUsers = async function(req, res) {
  try {
    var dbUsers = await User.findAll({
      include: [{
        model: Role,
        attributes: [
          ['role_name', 'role_name']
        ]
      }]
    })
    /*
    .then((users) => {
      res.send(users)
    })
    */
    .catch((err) => {throw err;});
    var users = await Promise.all(dbUsers.map(user => { return {"user": user} }));
    res.send(users);
  }
  catch(e) {
    return res.status(400).json({
      errors: {
        error: e.stack
      },
    });
  }
}

// PUT change password route
const changePassword = async function(req, res) {
  console.log("changing password....")
  console.log(req.session.user.id)
  console.log(req.body)
  const id = req.session.user.id
  const currentPassword = req.body.currentPassword
  const newPassword = req.body.newPassword

  try {
    const valid = await User.findByPk(id).then((user) => {
      console.log("found user")
      return user.validatePassword(currentPassword)
    })
    if (valid) {
      console.log("updating");
      await User.update({
        password: newPassword
      }, {
        where: {
          id: id
        },
        individualHooks: true
      }).catch((err) => {
        throw err;
      });

      console.log("updated");
      const user = await User.findByPk(id);
      console.log(user);
      req.session.user = user;
      res.status(200).end();
    } else {
      return res.status(500).send({error: "Incorrect password"})
    }
  } catch(e) {
    return res.status(400).json({
      errors: {
        error: e.stack
      },
    });
  }
}

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  getRoles,
  getUsers,
  changePassword
};
