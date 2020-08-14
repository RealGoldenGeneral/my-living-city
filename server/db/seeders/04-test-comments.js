'use strict';

var Sequelize = require('sequelize');
const db = require('../models/index');
const User = db.User;
const Idea = db.Idea;

/** 
 * Bulk inserts test comments into "Comments" table
*/

var testComments = [];

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

    for (let ideaIndex = 0; ideaIndex < ideaIds.length; ideaIndex++) {
      for (let userIndex = 0; userIndex < userIds.length; userIndex++) {
        testComments.push({
          "text": "This is placeholder text for a comment",
          "UserId": userIds[userIndex].id,
          "IdeaId": ideaIds[ideaIndex].id,
          "createdAt": new Date(),
          "updatedAt": new Date()
        });
      }
    }

    await queryInterface.bulkInsert('Comments', testComments);
  },
  down: function(queryInterface, Sequelize)
  {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
