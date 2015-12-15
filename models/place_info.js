'use strict';
module.exports = function(sequelize, DataTypes) {
  var placeinfo = sequelize.define('placeinfo', {
    place_id: DataTypes.STRING,
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    rating: DataTypes.DECIMAL,
    lat: DataTypes.DECIMAL,
    lon: DataTypes.DECIMAL,
    hours: DataTypes.ARRAY(DataTypes.STRING),
    types: DataTypes.ARRAY(DataTypes.STRING),
    photos: DataTypes.ARRAY(DataTypes.STRING),
    url: DataTypes.STRING,
    website: DataTypes.STRING,
    wifi: DataTypes.INTEGER,
    seating: DataTypes.INTEGER,
    noise: DataTypes.INTEGER,
    outlets: DataTypes.INTEGER,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    fav_count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.placeinfo.belongsToMany(models.tag, {through: 'placeinfoTags'});
        models.placeinfo.belongsToMany(models.drink, {through: 'placeinfoDrinks'});
        models.placeinfo.belongsToMany(models.food, {through: 'placeinfoFoods'});
        models.placeinfo.belongsToMany(models.user, {through: 'placeinfoUsers'});
      }
    }
  });
  return placeinfo;
};
