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
   

    await queryInterface.bulkInsert('Workers', [
      {
        id: "58a7331f-ec3c-4a43-9bc1-472706575828",
        firstname: 'Iris',
        lastname1: 'Balboa',
        email: 'it@lanaturalcoopmunicacio.org',
        hourlyRate: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: "db3bdc18-ae29-4a7d-b48d-1a3b891985ab",
        firstname: 'Judit',
        lastname1: 'LaRanota',
        lastname2: 'Calida',
        email: 'it@lanaturalcoopmunicacio.org',
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
    await queryInterface.bulkDelete('Workers', null, {});
  }
};
