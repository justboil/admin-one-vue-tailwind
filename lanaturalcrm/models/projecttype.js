'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProjectType.hasMany(models.Project);
    }
  }
  ProjectType.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProjectType',
  });
  return ProjectType;
};