'use strict';
/** @type {import('sequelize-cli').Migration} */


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Workers', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname2: {
        type: Sequelize.STRING
      },
      lastname1: {
        type: Sequelize.STRING
      },
      pronouns: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      officialId: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      hourlyRate: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Workers');
  }
};