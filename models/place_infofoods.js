'use strict';
module.exports = function(sequelize, DataTypes) {
  var place_infoFoods = sequelize.define('place_infoFoods', {
    place_infoId: DataTypes.INTEGER,
    foodId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return place_infoFoods;
};