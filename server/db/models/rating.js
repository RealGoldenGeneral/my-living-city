'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: DataTypes.INTEGER
  }, {});

  Rating.associate = function(models) {
    // Belongs-To associations
    Rating.belongsTo(models.User);
    Rating.belongsTo(models.Idea);
    Rating.belongsTo(models.Comment);

    // Belongs-To-Many associations

    // Has-One associations

    // Has-Many associations
  };
  
  return Rating;
};