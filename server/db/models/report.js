'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: DataTypes.STRING(5000),
    reason: DataTypes.STRING(5000)
  }, {});

  Report.associate = function(models) {
    // Belongs-To associations
    // Belongs-To-Many associations
    // Has-One associations
    // Has-Many associations
  };
  
  return Report;
};
