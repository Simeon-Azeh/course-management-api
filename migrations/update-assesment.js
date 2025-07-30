'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Assessments', 'courseOfferingId', {
      type: Sequelize.UUID,
      allowNull: true,  
      references: {
        model: 'course_offerings',  
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Assessments', 'courseOfferingId');
  }
};
