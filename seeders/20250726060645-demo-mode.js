'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if mode with type 'Online' already exists
    const existing = await queryInterface.sequelize.query(
      `SELECT id FROM modes WHERE type = 'Online' LIMIT 1;`
    );

    if (existing[0].length === 0) {
      await queryInterface.bulkInsert('modes', [
        {
          id: uuidv4(),
          type: 'Online',
          description: 'Google Meet sessions for online learning',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    } else {
      console.log("Mode 'Online' already exists, skipping insert.");
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('modes', { type: 'Online' });
  }
};
