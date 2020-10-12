'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class petugas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  petugas.init({
    id_petugas: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nama_petugas: DataTypes.STRING,
    jabatan_petugas: DataTypes.STRING,
    no_telp_petugas: DataTypes.STRING,
    alamat_petugas: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'petugas',
    tableName: 'petugas'
  });
  return petugas;
};