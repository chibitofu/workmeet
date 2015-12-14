'use strict';
module.exports = function(sequelize, DataTypes) {
  var place_info = sequelize.define('place_info', {
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
        models.place_info.belongsToMany(models.tag, {through: 'place_infoTags'});
        models.place_info.belongsToMany(models.drink, {through: 'place_infoDrinks'});
        models.place_info.belongsToMany(models.food, {through: 'place_infoFoods'});
        models.place_info.belongsToMany(models.user, {through: 'place_infoUsers'});
      }
    }
  });
  return place_info;
};
