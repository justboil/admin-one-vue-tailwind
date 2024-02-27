'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      transactionRef: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: "en curs"
      },
      date: {
        type: Sequelize.DATE
      },
      base: {
        type: Sequelize.INTEGER
      },
      iva: {
        type: Sequelize.INTEGER
      },
      irpf: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM("en curs", "tancada")
      },
      transactionType: {
        type: Sequelize.ENUM("factura", "nòmina", "subvenció")
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
    await queryInterface.dropTable('Transactions');
  }
};