'use strict';

var Sequelize = require('sequelize');
const db = require('../models/index');
const User = db.User;
const Idea = db.Idea;

/** 
 * Bulk inserts test ratings into "Ratings" table
*/

var testRatings = [];

module.exports = {
  up: async function(queryInterface, Sequelize)
  {
    var userIds = await User.findAll({
      attributes: ['id'],
      raw: true
    });

    var ideaIds = await Idea.findAll({
      attributes: ['id'],
      raw: true
    });

    let min = 1;
    let max = 10;

    for (let ideaIndex = 0; ideaIndex < ideaIds.length; ideaIndex++) {
      for (let userIndex = 0; userIndex < userIds.length; userIndex++) {
        testRatings.push({
          "rating": Math.floor(Math.random() * (max - (min) + 1) + (min) ),
          "UserId": userIds[userIndex].id,
          "IdeaId": ideaIds[ideaIndex].id,
          "createdAt": new Date(),
          "updatedAt": new Date()
        });
      }
    }

    await queryInterface.bulkInsert('Ratings', testRatings);
  },
  down: function(queryInterface, Sequelize)
  {
    return queryInterface.bulkDelete('Ratings', null, {});
  }
};
