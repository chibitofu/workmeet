'use strict';
module.exports = function(sequelize, DataTypes) {
  var placeinfoUsers = sequelize.define('placeinfoUsers', {
    placeinfoId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return placeinfoUsers;
};
