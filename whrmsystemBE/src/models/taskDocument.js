'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task_Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Task.hasMany(Task_Document, { foreignKey: 'TaskID' })
      Task_Document.belongsTo(models.Task, { foreignKey: 'TaskID' })
    }
  };
  Task_Document.init({
    TaskID: DataTypes.INTEGER,
    FilePath: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Task_Document',
  });
  return Task_Document;
};