'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if a course offering with the demo data already exists
    const existing = await queryInterface.sequelize.query(
      `SELECT id FROM course_offerings WHERE term = 'Fall' AND academicYear = '2025' LIMIT 1;`
    );

    if (existing[0].length === 0) {
    
      const moduleId = 'a05b5501-937a-4aa9-9d98-2f764b27787d';
      const cohortId = 'c5376bc6-a311-4fcc-a64a-8de00e021107';
      const facilitatorId = '75ce63c5-9c34-4189-b05c-fc3eff0b438f';
      const modeId = '5070716e-c7f3-4fe4-8bcf-6bc7cf3f8adb';

      await queryInterface.bulkInsert('course_offerings', [
        {
          id: uuidv4(),
          moduleId,
          cohortId,
          term: 'Fall',
          academicYear: '2025',
          intakePeriod: 'First',
          facilitatorId,
          modeId,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    } else {
      console.log('Course offering already exists, skipping insert.');
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('course_offerings', { term: 'Fall', academicYear: '2025' });
  }
};
