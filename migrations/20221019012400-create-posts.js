'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      postsId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      userId: {
        type: Sequelize.STRING
      },
      title:{
        type: Sequelize.STRING
      },
      content:{
        type: Sequelize.STRING
      },
      nickname:{
        type: Sequelize.STRING
      },
      password:{
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Posts');
  }
};