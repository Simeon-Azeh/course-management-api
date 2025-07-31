'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('course_offerings', 'intakePeriod', {
      type: Sequelize.STRING,
      allowNull: false, // or true if optional
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('course_offerings', 'intakePeriod');
  },
};
