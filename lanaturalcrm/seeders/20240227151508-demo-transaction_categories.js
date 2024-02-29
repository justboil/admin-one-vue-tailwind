'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Transaction_Categories', [
      {
        category: 'PERSONAL',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'FUNGIBLE',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'SOFTWARE I LLICÈNCIES',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'DIETES',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'EQUIPAMENT',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'SERVEIS EXTERNS',
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
