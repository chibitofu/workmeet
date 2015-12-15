'use strict';
module.exports = function(sequelize, DataTypes) {
  var placeinfoDrinks = sequelize.define('placeinfoDrinks', {
    placeinfoId: DataTypes.INTEGER,
    drinkId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return placeinfoDrinks;
};
