const Categorie = require("../models/Categorie");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll();
    res.json(categories);
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const Specialite = require("../models/Specialite");
exports.getSpecialitesByCategorie = async (req, res) => {
  const { id } = req.params;
  try {
    const specialites = await Specialite.findAll({
      where: { id_categorie: id },
    });

    res.json(specialites);
  } catch (error) {
    console.error("Erreur lors de la récupération des spécialités :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
