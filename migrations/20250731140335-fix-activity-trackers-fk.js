'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove the old foreign key constraint if it exists (skip if not present)
    // await queryInterface.removeConstraint('activitytrackers', 'activitytrackers_ibfk_1');

    // Add the new foreign key constraint referencing course_offerings
    await queryInterface.addConstraint('activitytrackers', {
      fields: ['allocationId'],
      type: 'foreign key',
      name: 'activityTrackers_allocationId_course_offerings_fk',
      references: {
        table: 'course_offerings',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('activitytrackers', 'activityTrackers_allocationId_course_offerings_fk');
    // Optionally, add the old constraint back if needed
    // await queryInterface.addConstraint('activitytrackers', {
    //   fields: ['allocationId'],
    //   type: 'foreign key',
    //   name: 'activitytrackers_ibfk_1',
    //   references: {
    //     table: 'courseOfferings',
    //     field: 'id'
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE'
    // });
  }
};