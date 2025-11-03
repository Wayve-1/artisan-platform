const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Categorie = sequelize.define(
  "Categorie",
  {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "categorie",
    timestamps: false,
  }
);

module.exports = Categorie;
