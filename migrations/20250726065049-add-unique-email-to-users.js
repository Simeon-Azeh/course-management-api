'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if unique index exists before creating
    const [results] = await queryInterface.sequelize.query(
      "SHOW INDEX FROM `users` WHERE Key_name = 'users_email_unique';"
    );

    if (results.length === 0) {
      await queryInterface.addIndex('users', ['email'], {
        unique: true,
        name: 'users_email_unique'
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('users', 'users_email_unique');
  }
};
