'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.belongsTo(models.Member, {foreignKey: "parentId", allowNull: true});
    }
  }
  Project.init({
    id: {
      type: DataTypes.UUID.V4,
      defaultValue: DataTypes.UUID.V4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};