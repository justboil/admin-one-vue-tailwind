'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Entity.hasMany(models.Member, {
        foreignKey: 'memberTypeId',
        constraints: false,
        scope: {
          memberType: 'entity'
        }
      })
    }
  }
  Entity.init({
    commercialName: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    officialId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Entity',
  });
  return Entity;
};