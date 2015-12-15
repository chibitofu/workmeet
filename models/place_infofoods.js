'use strict';
module.exports = function(sequelize, DataTypes) {
  var placeinfoFoods = sequelize.define('placeinfoFoods', {
    placeinfoId: DataTypes.INTEGER,
    foodId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return placeinfoFoods;
};
