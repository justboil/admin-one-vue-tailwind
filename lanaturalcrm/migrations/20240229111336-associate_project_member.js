module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Projects", // name of Source model
      "memberId", // name of the key we're adding
      {
        type: Sequelize.UUID,
        references: {
          model: 'Members', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Projects', // name of Source model
      'memberId' // key we want to remove
    );
  }
};