'use strict';
module.exports = function(sequelize, DataTypes) {
  var placeinfoTags = sequelize.define('placeinfoTags', {
    placeinfoId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return placeinfoTags;
};
