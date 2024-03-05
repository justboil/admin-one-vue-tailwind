'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      deadline: {
        type: Sequelize.DATE
      },
      descripcion: {
        type: Sequelize.STRING
      },
      defaultPrice: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('futur', 'pendent', 'en curs', 'tancat', 'tard')
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
    await queryInterface.dropTable('Tasks');
  }
};