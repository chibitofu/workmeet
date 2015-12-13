'use strict';
module.exports = function(sequelize, DataTypes) {
  var drink = sequelize.define('drink', {
    drink: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.drink.belongsToMany(models.place_id, {through: 'place_idDrinks'});
      }
    },
    hooks: {
      beforeCreate: function(drink, options, cont) {
        drink.drink = drink.drink.toLowerCase();

        cont(null, drink);
      }
    }
  });
  return drink;
};
