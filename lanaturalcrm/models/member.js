'use strict';
const {
  Model
} = require('sequelize');

const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;

module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    getInfoMember(options){
      if (!this.memberType) return Promise.resolve(null);
      const mixinMethodName = `getInfo${this.memberType}`;
      return this[mixinMethodName](options);
    }
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Member.belongsTo(models.Worker, {foreignKey: 'memberTypeId', constraints: false });
      Member.belongsTo(models.Entity, {foreignKey: 'memberTypeId', constraints: false });
      Member.belongsTo(models.Contact, {foreignKey: 'memberTypeId', constraints: false });
      Member.belongsTo(models.Member, {as: "ParentEntity", foreignKey: 'parentMemberId', constraints: false });
      Member.hasMany(models.Member, {as: "LinkedMembers", foreignKey: 'parentMemberId', constraints: false })
    }
  }
  Member.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    postcode: DataTypes.INTEGER,
    city: DataTypes.STRING,
    telephone: DataTypes.INTEGER,
    autorization_img: DataTypes.BOOLEAN,
    memberType: DataTypes.ENUM,
    memberTypeId: DataTypes.INTEGER,
    parentMemberId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};