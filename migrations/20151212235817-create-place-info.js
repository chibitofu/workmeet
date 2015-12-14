'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('place_infos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      place_id: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      icon: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.DECIMAL
      },
      lat: {
        type: Sequelize.DECIMAL
      },
      lon: {
        type: Sequelize.DECIMAL
      },
      hours: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      types: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      photos: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      url: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      wifi: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      seating: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      noise: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      outlets: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('place_infos');
  }
};
