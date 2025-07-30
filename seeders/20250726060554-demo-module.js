'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if the module already exists by title
    const existingModules = await queryInterface.sequelize.query(
      `SELECT id FROM modules WHERE title = 'Introduction to Nodejs and Express' LIMIT 1;`
    );

    if (existingModules[0].length === 0) {
      await queryInterface.bulkInsert('modules', [
        {
          id: uuidv4(),
          title: 'Introduction to Nodejs and Express',
          description: 'Basics of Nodejs and Express',
          durationWeeks: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    } else {
      console.log('Module already exists, skipping insert.');
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('modules', { title: 'Introduction to Nodejs and Express' });
  }
};
