const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Categorie = require("./Categorie");

const Specialite = sequelize.define(
  "Specialite",
  {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_categorie: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "specialite",
    timestamps: false,
  }
);

// Relation : une spécialité appartient à une catégorie
Specialite.belongsTo(Categorie, { foreignKey: "id_categorie" });

module.exports = Specialite;
