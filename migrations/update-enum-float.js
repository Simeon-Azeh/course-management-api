'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('activitytrackers', 'formativeOneGrading', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
    await queryInterface.changeColumn('activitytrackers', 'formativeTwoGrading', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
    await queryInterface.changeColumn('activitytrackers', 'summativeGrading', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('activitytrackers', 'formativeOneGrading', {
      type: Sequelize.ENUM('Done', 'Pending', 'Not Started'),
      defaultValue: 'Not Started',
    });
    await queryInterface.changeColumn('activitytrackers', 'formativeTwoGrading', {
      type: Sequelize.ENUM('Done', 'Pending', 'Not Started'),
      defaultValue: 'Not Started',
    });
    await queryInterface.changeColumn('activitytrackers', 'summativeGrading', {
      type: Sequelize.ENUM('Done', 'Pending', 'Not Started'),
      defaultValue: 'Not Started',
    });
  }
};