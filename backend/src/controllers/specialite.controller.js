const Specialite = require("../models/Specialite");
const Categorie = require("../models/Categorie");
const Artisan = require("../models/Artisan");

// On inclut la catégorie liée à chaque spécialité
Specialite.belongsTo(Categorie, { foreignKey: "id_categorie" });

exports.getAllSpecialites = async (req, res) => {
  try {
    const specialites = await Specialite.findAll({
      include: Categorie,
    });
    res.json(specialites);
  } catch (error) {
    console.error("Erreur lors de la récupération des spécialités :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.getSpecialiteById = async (req, res) => {
  const { id } = req.params;
  try {
    const specialite = await Specialite.findByPk(id, {
      include: Categorie,
    });

    if (!specialite) {
      return res.status(404).json({ error: "Spécialité non trouvée" });
    }

    res.json(specialite);
  } catch (error) {
    console.error("Erreur lors de la récupération de la spécialité :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

Specialite.belongsTo(Categorie, { foreignKey: "id_categorie" });

exports.getArtisansBySpecialite = async (req, res) => {
  const { id } = req.params;
  try {
    const artisans = await Artisan.findAll({
      where: { id_specialite: id },
      include: {
        model: Specialite,
        include: Categorie,
      },
    });

    res.json(artisans);
  } catch (error) {
    console.error("Erreur lors de la récupération des artisans :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
