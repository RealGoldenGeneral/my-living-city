'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    Street_Name: DataTypes.STRING,
    Postal_Code: DataTypes.STRING,
    location: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    RoleId: DataTypes.INTEGER
  });

  User.prototype.validatePassword = function (password) {
    console.log(password)
    console.log(this.password)
    return bcrypt.compareSync(password, this.password);
  };

  User.prototype.toAuthJSON = function() {
    return {
        id: this.id,
        email: this.email,
        fname: this.fname,
        lname: this.lname,
        Street_Name: this.Street_Name,
        Postal_Code: this.Postal_Code,
        location: this.location,
        latitude: this.latitude,
        longitude: this.longitude,
        RoleId: this.RoleId
    };
  };

  User.associate = function(models) {
    // Belongs-To associations
    User.belongsTo(models.Role);

    // Belongs-To-Many associations

    // Has-One associations

    // Has-Many associations
    User.hasMany(models.Idea);
    User.hasMany(models.Comment);
    User.hasMany(models.Rating);
    User.hasMany(models.Image);
    User.hasMany(models.Blog);
    User.hasMany(models.Vote);
  };

  User.beforeCreate((user, options) => {
    return cryptPassword(user.password)
    .then(success => {
        user.password = success;
    })
    .catch(err => {
        if (err) console.log(err);
    });
  });    

  User.beforeBulkUpdate((user, options) => {
    return cryptPassword(user.password)
    .then(success => {
        user.password = success;
    })
    .catch(err => {
        if (err) console.log(err);
    });
  });

  User.beforeUpdate((user, options) => {
    return cryptPassword(user.password)
    .then(success => {
        user.password = success;
    })
    .catch(err => {
        if (err) console.log(err);
    });
  });

  function cryptPassword(password) {
    return new Promise(function(resolve, reject) {
        bcrypt.hash(password, 10, function(err, hash) {
            if (err) return reject(err);
            return resolve(hash);
        });
    });  
  };

  return User;
};
