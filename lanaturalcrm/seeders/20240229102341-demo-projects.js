'use strict';

const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Projects', [
      {
        id: uuidv4(),
        name: "Whack-a-Mole design for Ateneu Candela",
        start_date: "2024-03-01 12:00:00",
        end_date: "2024-04-01 12:00:00",
        description: "l'Ateneu Candela vol un whack-a-mole com el del Sam&Max per promocionar l'esport i la vida saludable.",
        projectTypeId: 1,
        memberId: "03e65ded-5e8e-4796-b770-25bf96f12ae1",
        createdAt: new Date(),
        updatedAt: new Date()
      },    
    ], {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Projects', null, {});

  }
};
