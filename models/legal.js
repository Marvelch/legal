'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Legal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Legal.init({
    legalName: DataTypes.STRING,
    address: DataTypes.STRING,
    division: DataTypes.STRING,
    information: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Legal',
  });
  return Legal;
};