"use strict";
module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define(
    "Categorie",
    {
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "categorie",
      timestamps: false,
    }
  );

  Categorie.associate = (models) => {
    Categorie.hasMany(models.Specialite, {
      foreignKey: "id_categorie",
      as: "specialites",
    });
  };

  return Categorie;
};
