'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'placeinfos',
      'address',
      {
        type: Sequelize.STRING
      }).then(function () {
        return queryInterface.addColumn(
          'placeinfos',
          'phone',
          {
            type: Sequelize.STRING
          }
        );
      }).then(function () {
        return queryInterface.addColumn(
          'placeinfos',
          'fav_count',
          {
            type: Sequelize.INTEGER,
            defaultValue: 0
          }
        );
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'placeinfos',
      'address',
      {
        type: Sequelize.STRING
      }).then(function () {
        return queryInterface.removeColumn(
          'placeinfos',
          'phone',
          {
            type: Sequelize.STRING
          }
        );
      }).then(function () {
        return queryInterface.removeColumn(
          'placeinfos',
          'fav_count',
          {
            type: Sequelize.INTEGER,
            defaultValue: 0,
          }
        );
      });
  }
};
