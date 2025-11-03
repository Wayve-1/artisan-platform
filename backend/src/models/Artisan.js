const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Specialite = require("./Specialite");

const Artisan = sequelize.define(
  "Artisan",
  {
    nom: DataTypes.STRING,
    note: DataTypes.FLOAT,
    localisation: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    email: DataTypes.STRING,
    site_web: DataTypes.STRING,
    id_specialite: DataTypes.INTEGER,
  },
  {
    tableName: "artisan",
    timestamps: false,
  }
);

// Relation : un artisan appartient à une spécialité
Artisan.belongsTo(Specialite, { foreignKey: "id_specialite" });

module.exports = Artisan;
