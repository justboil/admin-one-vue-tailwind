'use strict';

const { v4: uuidv4 } = require('uuid')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   

    await queryInterface.bulkInsert('Transactions', [
      {
        id: "58a7331f-ec3c-4a43-9bc1-472706575828",
        transactionRef: 'FACT_001',
        date: '2024-03-01 10:53:25',
        base: 300,
        irpf: 19,
        status: "tancada",
        transactionType: "factura",
        categoryId: 2,
        tipusIVAId: 1,
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3149",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: "db3bdc18-ae29-4a7d-b48d-1a3b891985ab",
        transactionRef: 'LANATURAL3331',
        date: '2024-02-01 10:53:25',
        base: 135,
        irpf: 19,
        status: "tancada",
        transactionType: "factura",
        categoryId: 2,
        tipusIVAId: 1,
        projectId: "837c6321-e1f3-4c25-86fe-de028bfe3149",
        createdAt: new Date(),
        updatedAt: new Date()
      }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Transactions', null, {});
  }
};
