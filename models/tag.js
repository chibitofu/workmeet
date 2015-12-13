'use strict';
module.exports = function(sequelize, DataTypes) {
  var tag = sequelize.define('tag', {
    tag: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.tag.belongsToMany(models.place_info, {through: 'place_infoTags'});
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
