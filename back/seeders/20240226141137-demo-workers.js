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
        id: uuidv4(),
        firstname: 'Iris',
        lastname1: 'Balboa',
        email: 'it@lanaturalcoopmunicacio.org',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: uuidv4(),
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
