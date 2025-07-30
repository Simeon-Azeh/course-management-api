'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch required foreign keys from existing data
    
    // 1. Get one module
    const [modules] = await queryInterface.sequelize.query(
      `SELECT id FROM modules LIMIT 1;`
    );
    if (modules.length === 0) {
      console.log('No modules found. Please seed modules first.');
      return;
    }
    const moduleId = modules[0].id;

    // 2. Get one cohort
    const [cohorts] = await queryInterface.sequelize.query(
      `SELECT id FROM cohorts LIMIT 1;`
    );
    if (cohorts.length === 0) {
      console.log('No cohorts found. Please seed cohorts first.');
      return;
    }
    const cohortId = cohorts[0].id;

    // 3. Get one facilitator (User with role 'facilitator')
    const [facilitators] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE role = 'facilitator' LIMIT 1;`
    );
    if (facilitators.length === 0) {
      console.log('No facilitators found. Please seed facilitators first.');
      return;
    }
    const facilitatorId = facilitators[0].id;

    // 4. Get one courseOffering
    const [courseOfferings] = await queryInterface.sequelize.query(
      `SELECT id FROM course_offerings LIMIT 1;`
    );
    if (courseOfferings.length === 0) {
      console.log('No course offerings found. Please seed course offerings first.');
      return;
    }
    const courseOfferingId = courseOfferings[0].id;

    // 5. Get one mode
    const [modes] = await queryInterface.sequelize.query(
      `SELECT id FROM modes LIMIT 1;`
    );
    if (modes.length === 0) {
      console.log('No modes found. Please seed modes first.');
      return;
    }
    const modeId = modes[0].id;

    // Insert demo class
    await queryInterface.bulkInsert('classes', [{
      id: uuidv4(),
      topic: 'Introduction to Node.js',
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      time: '10:00',  // example time, adjust as needed
      durationMinutes: 90,
      moduleId,
      cohortId,
      facilitatorId,
      courseOfferingId,
      modeId,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('classes', {
      topic: 'Introduction to Node.js'
    });
  }
};
