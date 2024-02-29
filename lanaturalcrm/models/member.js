'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Member.belongsTo(models.Member, {as: "Parent", foreignKey: "parentId", allowNull: true});
      Member.hasMany(models.Member, {as: "LinkedMembers", foreignKey: "parentId"})
    }
  }
  Member.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID.V4,
      primaryKey: true,
    },
    firstname: DataTypes.STRING,
    lastname1: DataTypes.STRING,
    lastname2: DataTypes.STRING,
    commercialName1: DataTypes.STRING,
    commercialName2: DataTypes.STRING,
    pronouns: DataTypes.STRING,
    role: DataTypes.STRING,
    officialId: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    postcode: DataTypes.STRING,
    country: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    authorizationImg: DataTypes.BOOLEAN,
    memberType: DataTypes.ENUM('entity', 'contact')

  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};