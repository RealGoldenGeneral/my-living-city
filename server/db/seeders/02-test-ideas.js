'use strict';

var Sequelize = require('sequelize');
const db = require('../models/index');
const User = db.User;

/** 
 * Bulk inserts test ideas into "Ideas" table
*/

var testIdeas = [
  {
    "title": "Test Idea 1",
    "description": "Placeholder text for a description",
    "community_impact": "Low",
    "nature_impact": "Low",
    "arts_impact": "Low",
    "energy_impact": "Low",
    "manufacturing_impact": "Low",
    "UserId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "title": "Test Idea 2",
    "description": "Placeholder text for a description",
    "community_impact": "Medium",
    "nature_impact": "Low",
    "arts_impact": "Low",
    "energy_impact": "Low",
    "manufacturing_impact": "Low",
    "UserId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "title": "Test Idea 3",
    "description": "Placeholder text for a description",
    "community_impact": "High",
    "nature_impact": "Medium",
    "arts_impact": "Low",
    "energy_impact": "Low",
    "manufacturing_impact": "Low",
    "UserId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "title": "Test Idea 4",
    "description": "Placeholder text for a description",
    "community_impact": "Low",
    "nature_impact": "High",
    "arts_impact": "Medium",
    "energy_impact": "Low",
    "manufacturing_impact": "Low",
    "UserId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "title": "Test Idea 5",
    "description": "Placeholder text for a description",
    "community_impact": "Medium",
    "nature_impact": "Low",
    "arts_impact": "High",
    "energy_impact": "Medium",
    "manufacturing_impact": "Low",
    "UserId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "title": "Test Idea 6",
    "description": "Placeholder text for a description",
    "community_impact": "High",
    "nature_impact": "Medium",
    "arts_impact": "Low",
    "energy_impact": "High",
    "manufacturing_impact": "Medium",
    "UserId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "title": "Test Idea 7",
    "description": "Placeholder text for a description",
    "community_impact": "Low",
    "nature_impact": "High",
    "arts_impact": "Medium",
    "energy_impact": "Low",
    "manufacturing_impact": "High",
    "UserId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "title": "Test Idea 8",
    "description": "Placeholder text for a description",
    "community_impact": "Medium",
    "nature_impact": "Low",
    "arts_impact": "High",
    "energy_impact": "Medium",
    "manufacturing_impact": "Low",
    "UserId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "title": "Test Idea 9",
    "description": "Placeholder text for a description",
    "community_impact": "High",
    "nature_impact": "Medium",
    "arts_impact": "Low",
    "energy_impact": "High",
    "manufacturing_impact": "Medium",
    "UserId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "title": "Test Idea 10",
    "description": "Placeholder text for a description",
    "community_impact": "Low",
    "nature_impact": "High",
    "arts_impact": "Medium",
    "energy_impact": "Low",
    "manufacturing_impact": "High",
    "UserId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "title": "Test Idea 11",
    "description": "Placeholder text for a description",
    "community_impact": "Medium",
    "nature_impact": "Low",
    "arts_impact": "High",
    "energy_impact": "Medium",
    "manufacturing_impact": "Low",
    "UserId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "title": "Test Idea 12",
    "description": "Placeholder text for a description",
    "community_impact": "High",
    "nature_impact": "Medium",
    "arts_impact": "Low",
    "energy_impact": "High",
    "manufacturing_impact": "Medium",
    "UserId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "title": "Test Idea 13",
    "description": "Placeholder text for a description",
    "community_impact": "Low",
    "nature_impact": "High",
    "arts_impact": "Medium",
    "energy_impact": "Low",
    "manufacturing_impact": "High",
    "UserId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "title": "Test Idea 14",
    "description": "Placeholder text for a description",
    "community_impact": "Medium",
    "nature_impact": "Low",
    "arts_impact": "High",
    "energy_impact": "Medium",
    "manufacturing_impact": "Low",
    "UserId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "title": "Test Idea 15",
    "description": "Placeholder text for a description",
    "community_impact": "High",
    "nature_impact": "Medium",
    "arts_impact": "Low",
    "energy_impact": "High",
    "manufacturing_impact": "Medium",
    "UserId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "title": "Test Idea 16",
    "description": "Placeholder text for a description",
    "community_impact": "Low",
    "nature_impact": "High",
    "arts_impact": "Medium",
    "energy_impact": "Low",
    "manufacturing_impact": "High",
    "UserId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "title": "Test Idea 17",
    "description": "Placeholder text for a description",
    "community_impact": "Medium",
    "nature_impact": "Low",
    "arts_impact": "High",
    "energy_impact": "Medium",
    "manufacturing_impact": "Low",
    "UserId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "title": "Test Idea 18",
    "description": "Placeholder text for a description",
    "community_impact": "High",
    "nature_impact": "Medium",
    "arts_impact": "Low",
    "energy_impact": "High",
    "manufacturing_impact": "Medium",
    "UserId": 0,
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
];

module.exports = {
  up: async function(queryInterface, Sequelize)
  {
    var userIds = await User.findAll({
      attributes: ['id'],
      raw: true
    });

    var index = 0;
    for (let idea of testIdeas) {
      idea.UserId = userIds[index].id
      if (index < userIds.length - 1) {
        index++;
      } else {
        index = 0;
      }
    }

    await queryInterface.bulkInsert('Ideas', testIdeas);
  },
  down: function(queryInterface, Sequelize)
  {
    return queryInterface.bulkDelete('Ideas', null, {});
  }
};
