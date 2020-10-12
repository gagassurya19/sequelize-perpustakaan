'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class peminjaman extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  peminjaman.init({
    id_peminjaman: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    tanggal_pinjam: DataTypes.DATE,
    tanggal_kembali: DataTypes.DATE,
    id_buku: DataTypes.INTEGER,
    id_anggota: DataTypes.INTEGER,
    id_petugas: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'peminjaman',
    tableName: 'peminjaman'
  });
  return peminjaman;
};