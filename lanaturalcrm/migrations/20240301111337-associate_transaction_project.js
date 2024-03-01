module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Transactions", // name of Source model
      "projectId", // name of the key we're adding
      {
        type: Sequelize.UUID,
        references: {
          model: 'Projects', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Transactions', // name of Source model
      'projectId' // key we want to remove
    );
  }
};