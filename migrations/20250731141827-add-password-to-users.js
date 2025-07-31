'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,  // or true if you want to allow null for some reason
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'password');
  }
};
