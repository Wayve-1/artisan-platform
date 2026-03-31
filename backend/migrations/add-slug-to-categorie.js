"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("categorie", "slug", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      defaultValue: "",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("categorie", "slug");
  },
};
