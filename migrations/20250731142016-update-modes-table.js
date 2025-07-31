'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove the old 'name' column
    await queryInterface.removeColumn('modes', 'name');

    // Add the new 'type' ENUM column
    await queryInterface.addColumn('modes', 'type', {
      type: Sequelize.ENUM('in-person', 'online', 'hybrid'),
      allowNull: false,
    });

    // Add the new 'description' column (nullable)
    await queryInterface.addColumn('modes', 'description', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert changes: add back 'name'
    await queryInterface.addColumn('modes', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Remove 'type' and 'description'
    await queryInterface.removeColumn('modes', 'type');
    await queryInterface.removeColumn('modes', 'description');
  }
};
