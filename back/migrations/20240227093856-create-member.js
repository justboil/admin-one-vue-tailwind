'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Members', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname1: {
        type: Sequelize.STRING
      },
      lastname2: {
        type: Sequelize.STRING
      },
      commercialName1: {
        type: Sequelize.STRING
      },
      commercialName2: {
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
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      postcode: {
        type: Sequelize.INTEGER
      },
      country: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.INTEGER
      },
      authorizationImg: {
        type: Sequelize.BOOLEAN
      },
      memberType: {
        type: Sequelize.ENUM('contact', 'entity')
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
    await queryInterface.dropTable('Members');
  }
};