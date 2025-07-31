'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('assessment_submissions', 'assessmentId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'assessments',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('assessment_submissions', 'assessmentId');
  },
};
