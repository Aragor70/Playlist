'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SongPlaylists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SongId : {
        type : Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Songs"
          },
          key: 'id'
        },
        allowNull: false
      },
      PlaylistId : {
        type : Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Playlists"
          },
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SongPlaylists');
  }
};