'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task_User_Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task_User_Document.belongsTo(models.Task, { foreignKey: 'TaskID' })
      Task_User_Document.belongsTo(models.User, { foreignKey: 'UserID' })
    }
  };
  Task_User_Document.init({
    UserID: DataTypes.INTEGER,
    TaskID: DataTypes.INTEGER,
    FilePath: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Task_User_Document',
  });
  return Task_User_Document;
};