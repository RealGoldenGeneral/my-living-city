const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('../db/models/index');
const User = db.User; 
const Role = db.Role;

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]',
}, (email, password, done) => {
    User.findOne({
        include: [{
          model: Role,
          attributes: [
            ['role_name', 'role_name']
          ]
        }], 
        where: {
            'email': email
        },
    })
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch(done);
}));
