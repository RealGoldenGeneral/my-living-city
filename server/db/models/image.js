'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    filename: DataTypes.STRING(),
  }, {});

  Image.associate = function(models) {
    // Belongs-To associations
    Image.belongsTo(models.User);
    Image.belongsTo(models.Blog);
    Image.belongsTo(models.Idea);

    // Belongs-To-Many associations

    // Has-One associations

    // Has-Many associations
  };
  
  return Image;
};
