'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.Project, {foreignKey: "projectId"})
      Task.belongsTo(models.Tasl, {as: "parentTask", foreignKey: "parentID"})
      Task.hasMany(models.Task, {as: "subTasks", foreignKey: "parentId"})
      Task.belongsToMany(models.Workers, {through: "Tasks_By_Worker"})
      Task.belongsToMany(models.ProjectType, {through: "Tasks_By_ProjectType"})
    }
  }
  Task.init({
    title: DataTypes.STRING,
    deadline: DataTypes.DATE,
    descripcion: DataTypes.STRING,
    defaultPrice: DataTypes.INTEGER,
    status: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};