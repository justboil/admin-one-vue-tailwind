module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Transactions", // name of Source model
      "tipusIVAId", // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Transaction_TipusIVAs', // name of Target model
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
      'tipusIVAId' // key we want to remove
    );
  }
};