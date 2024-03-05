'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Transaction_TipusIVAs', [
      {
        tipusIVA: 21,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tipusIVA: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tipusIVA: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tipusIVA: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tipusIVA: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
