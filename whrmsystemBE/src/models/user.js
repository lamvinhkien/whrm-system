'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Group)
      User.hasMany(models.Task_User_Document, { foreignKey: 'UserID' })
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    avatar: DataTypes.STRING,
    typeAccount: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
    groupId: DataTypes.INTEGER,
    idGoogle: DataTypes.STRING,
    idFacebook: DataTypes.STRING,
    codeOTP: DataTypes.STRING,
    wrongLogin: DataTypes.STRING,
    expiresLock: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};