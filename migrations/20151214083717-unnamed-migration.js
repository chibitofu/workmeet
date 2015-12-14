'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'place_infos',
      'address',
      {
        type: Sequelize.STRING
      }).then(function () {
        return queryInterface.addColumn(
          'place_infos',
          'phone',
          {
            type: Sequelize.STRING
          }
        );
      }).then(function () {
        return queryInterface.addColumn(
          'place_infos',
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
      'place_infos',
      'address',
      {
        type: Sequelize.STRING
      }).then(function () {
        return queryInterface.removeColumn(
          'place_infos',
          'phone',
          {
            type: Sequelize.STRING
          }
        );
      }).then(function () {
        return queryInterface.removeColumn(
          'place_infos',
          'fav_count',
          {
            type: Sequelize.INTEGER,
            defaultValue: 0,
          }
        );
      });
  }
};
