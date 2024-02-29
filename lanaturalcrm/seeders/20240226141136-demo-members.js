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
   

    await queryInterface.bulkInsert('Members', [
      {
        id: "03e65ded-5e8e-4796-b770-25bf96f12ae1",
        commercialName1: 'Ateneu Candela',
        email: 'candelagestio@gmail.com',
        officialId: "G6346477",
        address: "SANT GAIETA, Nº 73",
        city: "TERRASSA",
        postcode: "08221",
        country: "SPAIN",
        phoneNumber: "937339421",
        memberType: 'entity',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "a0ff9e3d-2bc0-4e95-bdea-e7eb3028f4c1",
        commercialName1: 'Ateneu Candela',
        email: 'candelagestio@gmail.com',
        officialId: "G6346477",
        address: "CARRER PERU, 186",
        city: "BARCELONA",
        postcode: "08020",
        country: "SPAIN",
        phoneNumber: "932178166",
        memberType: 'entity',
        createdAt: new Date(),
        updatedAt: new Date()
      },])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Members', null, {});
  }
};
