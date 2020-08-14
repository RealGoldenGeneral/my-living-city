'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    up: DataTypes.BOOLEAN,
    down: DataTypes.BOOLEAN
  }, {});
  Vote.associate = function(models) {
    // Belongs-To associations
    Vote.belongsTo(models.User);
    Vote.belongsTo(models.Idea);
    Vote.belongsTo(models.Comment);

    // Belongs-To-Many associations

    // Has-One associations

    // Has-Many associations
  };
  return Vote;
};
