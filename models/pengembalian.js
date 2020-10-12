'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pengembalian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  pengembalian.init({
    id_pengembalian: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    tanggal_pengembalian: DataTypes.DATE,
    denda: DataTypes.DOUBLE,
    id_buku: DataTypes.INTEGER,
    id_anggota: DataTypes.INTEGER,
    id_petugas: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pengembalian',
    tableName: 'pengembalian'
  });
  return pengembalian;
};