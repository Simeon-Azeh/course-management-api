'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if cohort with the name already exists
    const [results, metadata] = await queryInterface.sequelize.query(
      `SELECT id FROM cohorts WHERE name = 'Cohort Alpha' LIMIT 1;`
    );

    if (results.length === 0) {
      // Insert only if not found
      await queryInterface.bulkInsert('cohorts', [
        {
          id: uuidv4(),
          name: 'Cohort Alpha',
          // Remove intake if your table has no intake column
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    } else {
      console.log('Cohort Alpha already exists, skipping seeding.');
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cohorts', { name: 'Cohort Alpha' });
  }
};
