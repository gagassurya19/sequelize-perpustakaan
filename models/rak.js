'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rak extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  rak.init({
    id_rak: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nama_rak: DataTypes.STRING,
    lokasi_rak: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'rak',
    tableName: 'rak'
  });
  return rak;
};