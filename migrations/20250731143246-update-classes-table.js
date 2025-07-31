'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('classes', 'topic', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('classes', 'date', {
        type: Sequelize.DATEONLY,
        allowNull: true
      }),
      queryInterface.addColumn('classes', 'time', {
        type: Sequelize.TIME,
        allowNull: true
      }),
      queryInterface.addColumn('classes', 'durationMinutes', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      queryInterface.addColumn('classes', 'moduleId', {
        type: Sequelize.UUID,
        allowNull: true
      }),
      queryInterface.addColumn('classes', 'cohortId', {
        type: Sequelize.UUID,
        allowNull: true
      }),
      queryInterface.addColumn('classes', 'facilitatorId', {
        type: Sequelize.UUID,
        allowNull: true
      }),
      queryInterface.addColumn('classes', 'modeId', {
        type: Sequelize.UUID,
        allowNull: true
      }),
      queryInterface.addColumn('classes', 'courseOfferingId', {
        type: Sequelize.UUID,
        allowNull: true
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.removeColumn('classes', 'topic'),
      queryInterface.removeColumn('classes', 'date'),
      queryInterface.removeColumn('classes', 'time'),
      queryInterface.removeColumn('classes', 'durationMinutes'),
      queryInterface.removeColumn('classes', 'moduleId'),
      queryInterface.removeColumn('classes', 'cohortId'),
      queryInterface.removeColumn('classes', 'facilitatorId'),
      queryInterface.removeColumn('classes', 'modeId'),
      queryInterface.removeColumn('classes', 'courseOfferingId'),
    ]);
  }
};
