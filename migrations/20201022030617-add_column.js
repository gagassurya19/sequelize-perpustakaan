'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.createTable('users', { id: Sequelize.INTEGER }); --> for table
    await queryInterface.addColumn(
      "buku", // NAMA TABLE
      "cover", // NAMA COLOUMN
      { type: Sequelize.STRING } // TYPE DATA
    )
    await queryInterface.addColumn("anggota","avatar",{ type: Sequelize.STRING })
    await queryInterface.addColumn("petugas","avatar",{ type: Sequelize.STRING })
  },
  down: async (queryInterface, Sequelize) => {
    // await queryInterface.dropTable('users'); --> for table
    await queryInterface.removeColumn("buku","cover")
    await queryInterface.removeColumn("anggota","avatar")
    await queryInterface.removeColumn("petugas","avatar")
  }
};