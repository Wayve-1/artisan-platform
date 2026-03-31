const Artisan = require("../models/Artisan");
const Specialite = require("../models/Specialite");
const Categorie = require("../models/Categorie");
const { validationResult } = require("express-validator");

Specialite.belongsTo(Categorie, { foreignKey: "id_categorie" });
Artisan.belongsTo(Specialite, { foreignKey: "id_specialite" });

exports.getAllArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
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

exports.getArtisanById = async (req, res) => {
  const { id } = req.params;
  try {
    const artisan = await Artisan.findByPk(id, {
      include: {
        model: Specialite,
        include: Categorie,
      },
    });

    if (!artisan) {
      return res.status(404).json({ error: "Artisan non trouvé" });
    }

    res.json(artisan);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'artisan :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.getArtisansByLocalisation = async (req, res) => {
  const { localisation } = req.query;
  try {
    const whereClause = localisation ? { localisation } : {};
    const artisans = await Artisan.findAll({
      where: whereClause,
      include: {
        model: Specialite,
        include: Categorie,
      },
    });
    res.json(artisans);
  } catch (error) {
    console.error("Erreur lors du filtrage des artisans :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.getArtisansByCategorie = async (req, res) => {
  const { categorie } = req.query;
  try {
    const artisans = await Artisan.findAll({
      include: {
        model: Specialite,
        include: {
          model: Categorie,
          where: categorie ? { nom: categorie } : undefined,
        },
      },
    });
    res.json(artisans);
  } catch (error) {
    console.error("Erreur lors du filtrage par catégorie :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.createArtisan = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newArtisan = await Artisan.create(req.body);
    res.status(201).json(newArtisan);
  } catch (error) {
    console.error("Erreur lors de la création de l'artisan :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.updateArtisan = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  try {
    const artisan = await Artisan.findByPk(id);
    if (!artisan) {
      return res.status(404).json({ error: "Artisan non trouvé" });
    }

    await artisan.update(req.body);
    res.json(artisan);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'artisan :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.deleteArtisan = async (req, res) => {
  const { id } = req.params;
  try {
    const artisan = await Artisan.findByPk(id);
    if (!artisan) {
      return res.status(404).json({ error: "Artisan non trouvé" });
    }

    await artisan.destroy();
    res.json({ message: "Artisan supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'artisan :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
