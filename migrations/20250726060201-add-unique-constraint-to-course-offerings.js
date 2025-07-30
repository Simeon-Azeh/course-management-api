"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('course_offerings', {
      fields: ['moduleId', 'cohortId', 'term', 'academicYear'],
      type: 'unique',
      name: 'unique_course_offering_constraint'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('course_offerings', 'unique_course_offering_constraint');
  }
};
