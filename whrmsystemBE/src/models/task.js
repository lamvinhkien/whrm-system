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
      // define association here
      Task.hasMany(models.Task_User_Document, { foreignKey: 'TaskID' })
    }
  };
  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    endDate: DataTypes.DATE,
    postBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};