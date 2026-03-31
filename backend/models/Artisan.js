"use strict";
module.exports = (sequelize, DataTypes) => {
  const Artisan = sequelize.define(
    "Artisan",
    {
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      note: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      localisation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_specialite: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "artisan",
      timestamps: false,
    }
  );

  Artisan.associate = (models) => {
    Artisan.belongsTo(models.Specialite, {
      foreignKey: "id_specialite",
      as: "specialite",
    });
  };

  return Artisan;
};
