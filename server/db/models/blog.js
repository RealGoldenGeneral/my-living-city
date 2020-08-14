'use strict';
module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    markdown: DataTypes.STRING(20000),
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    slug: DataTypes.STRING,
    short_desc: DataTypes.STRING(500),
  }, {});

  Blog.associate = function(models) {
    // Belongs-To associations
    Blog.belongsTo(models.User);

    // Belongs-To-Many associations

    // Has-One associations

    // Has-Many associations
  };
  
  return Blog;
};
