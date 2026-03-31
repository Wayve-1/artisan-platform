"use strict";
module.exports = (sequelize, DataTypes) => {
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

  Specialite.associate = (models) => {
    Specialite.belongsTo(models.Categorie, {
      foreignKey: "id_categorie",
      as: "categorie",
    });
    Specialite.hasMany(models.Artisan, {
      foreignKey: "id_specialite",
      as: "artisans",
    });
  };

  return Specialite;
};
