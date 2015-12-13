'use strict';
module.exports = function(sequelize, DataTypes) {
  var place_infoDrinks = sequelize.define('place_infoDrinks', {
    place_infoId: DataTypes.INTEGER,
    drinkId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return place_infoDrinks;
};