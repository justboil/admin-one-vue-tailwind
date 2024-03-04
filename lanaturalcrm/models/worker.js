'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Worker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Worker.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstname: DataTypes.STRING,
    lastname2: DataTypes.STRING,
    lastname1: DataTypes.STRING,
    pronouns: DataTypes.STRING,
    role: DataTypes.STRING,
    officialId: DataTypes.STRING,
    email: DataTypes.STRING,
    hourlyRate: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Worker',
  });
  return Worker;
};