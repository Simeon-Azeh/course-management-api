'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Only add courseOfferingId — assessmentId already exists
    await queryInterface.addColumn('assessment_submissions', 'courseOfferingId', {
      type: Sequelize.UUID,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('assessment_submissions', 'courseOfferingId');
  }
};
