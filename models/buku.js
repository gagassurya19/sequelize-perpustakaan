'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class buku extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  buku.init({
    id_buku: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_rak: DataTypes.INTEGER,
    judul_buku: DataTypes.STRING,
    penulis_buku: DataTypes.STRING,
    penerbit_buku: DataTypes.STRING,
    tahun_penerbit: DataTypes.STRING,
    stok: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'buku',
    tableName: 'buku'
  });
  return buku;
};