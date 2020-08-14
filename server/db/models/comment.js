'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: DataTypes.STRING(5000),
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});

  Comment.associate = function(models) {
    // Belongs-To associations
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.Blog);
    Comment.belongsTo(models.Idea);

    // Belongs-To-Many associations

    // Has-One associations

    // Has-Many associations
    Comment.hasMany(models.Rating);
  };
  
  return Comment;
};
