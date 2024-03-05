'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction_TipusIVA extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction_TipusIVA.hasMany(models.Transaction, {foreignKey: "tipusIVAId", allowNull: true});
    }
  }
  Transaction_TipusIVA.init({
    tipusIVA: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction_TipusIVA',
  });
  return Transaction_TipusIVA;
};