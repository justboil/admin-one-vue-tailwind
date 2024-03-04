'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Transaction_Category, {foreignKey: "categoryId", allowNull: true});
      Transaction.belongsTo(models.Transaction_TipusIVA, {foreignKey: "tipusIVAId", allowNull: true});
      Transaction.belongsTo(models.Project, {foreignKey: "projectId", allowNull: true});
    }
  }
  Transaction.init({
    transactionRef: DataTypes.STRING,
    date: DataTypes.DATE,
    description: DataTypes.STRING,
    base: DataTypes.INTEGER,
    irpf: DataTypes.INTEGER,
    status: DataTypes.ENUM("en curs", "tancada"),
    transactionType: DataTypes.ENUM("factura", "nòmina", "subvenció")
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};