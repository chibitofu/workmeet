'use strict';
module.exports = function(sequelize, DataTypes) {
  var place_info = sequelize.define('place_info', {
    place_id: DataTypes.STRING,
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    rating: DataTypes.DECIMAL,
    lat: DataTypes.DECIMAL,
    lon: DataTypes.DECIMAL,
    hours: DataTypes.ARRAY,
    types: DataTypes.ARRAY,
    photos: DataTypes.ARRAY,
    url: DataTypes.STRING,
    website: DataTypes.STRING,
    wifi: DataTypes.INTEGER,
    seating: DataTypes.INTEGER,
    noise: DataTypes.INTEGER,
    outlets: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.place_info.belongsToMany(models.tag, {through: 'place_infoTags'});
        models.place_info.belongsToMany(models.drink, {through: 'place_infoDrinks'});
        models.place_info.belongsToMany(models.food, {through: 'place_infoFoods'});
        models.place_info.belongsToMany(models.user, {through: 'place_infoUsers'});
      }
    }
  });
  return place_info;
};
