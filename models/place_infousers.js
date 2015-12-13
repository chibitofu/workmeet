'use strict';
module.exports = function(sequelize, DataTypes) {
  var place_infoUsers = sequelize.define('place_infoUsers', {
    place_infoId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return place_infoUsers;
};