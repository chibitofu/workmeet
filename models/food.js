'use strict';
module.exports = function(sequelize, DataTypes) {
  var food = sequelize.define('food', {
    food: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.food.belongsToMany(models.place_info, {through: 'place_infoFoods'});
      }
    },
    hooks: {
      beforeCreate: function(food, options, cont) {
        food.food = food.food.toLowerCase();

        cont(null, food);
      }
    }
  });
  return food;
};
