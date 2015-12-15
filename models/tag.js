'use strict';
module.exports = function(sequelize, DataTypes) {
  var tag = sequelize.define('tag', {
    tag: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.tag.belongsToMany(models.placeinfo, {through: 'placeinfoTags'});
      }
    },
    hooks: {
      beforeCreate: function(tag, options, cont) {
        tag.tag = tag.tag.toLowerCase();

        cont(null, tag);
      }
    }
  });
  return tag;
};
