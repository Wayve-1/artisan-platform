const express = require("express");
const router = express.Router();
const { Artisan, Specialite, Categorie } = require("../../models");
const { Op } = require("sequelize");

// 👉 GET /api/artisans (liste avec filtres)
router.get("/", async (req, res) => {
  console.log("✅ Route GET /api/artisans appelée");
  try {
    const { id_categorie, categorie, search } = req.query;
    const normalizedSlug = categorie ? String(categorie).toLowerCase() : null;

    const where = {};

    // 🔍 Recherche texte (artisan + spécialité + catégorie)
    if (search) {
      where[Op.or] = [
        { nom: { [Op.like]: `%${search}%` } },
        { localisation: { [Op.like]: `%${search}%` } },
        { "$specialite.nom$": { [Op.like]: `%${search}%` } },
        { "$specialite.categorie.nom$": { [Op.like]: `%${search}%` } },
      ];
    }

    const include = [
      {
        model: Specialite,
        as: "specialite",
        attributes: ["id", "nom"],
        required: true,
        include: [
          {
            model: Categorie,
            as: "categorie",
            attributes: ["id", "nom", "slug"],
            ...(normalizedSlug && { where: { slug: normalizedSlug } }),
            ...(id_categorie && { where: { id: parseInt(id_categorie, 10) } }),
          },
        ],
      },
    ];

    const artisans = await Artisan.findAll({
      attributes: [
        "id",
        "nom",
        "note",
        "localisation",
        "image",
        "id_specialite",
      ],
      where,
      include,
      order: [["nom", "ASC"]],
      subQuery: false,
    });

    res.json(artisans);
  } catch (err) {
    console.error("Erreur GET /api/artisans:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// 👉 GET /api/artisans/featured (artisans du mois)
router.get("/featured", async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      attributes: [
        "id",
        "nom",
        "note",
        "localisation",
        "image",
        "id_specialite",
      ],
      include: [
        {
          model: Specialite,
          as: "specialite",
          attributes: ["id", "nom"],
          required: true,
          include: [
            {
              model: Categorie,
              as: "categorie",
              attributes: ["id", "nom", "slug"],
            },
          ],
        },
      ],
      where: { note: { [Op.gte]: 4.5 } },
      order: [["note", "DESC"]],
      limit: 3,
      subQuery: false,
    });

    res.json(artisans);
  } catch (err) {
    console.error("Erreur GET /api/artisans/featured:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// 👉 GET /api/artisans/:id (un artisan par ID)
router.get("/:id", async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      attributes: [
        "id",
        "nom",
        "note",
        "localisation",
        "image",
        "email",
        "site_web",
        "description",
        "id_specialite",
      ],
      include: [
        {
          model: Specialite,
          as: "specialite",
          attributes: ["id", "nom"],
          required: true,
          include: [
            {
              model: Categorie,
              as: "categorie",
              attributes: ["id", "nom", "slug"],
            },
          ],
        },
      ],
      subQuery: false,
    });

    if (!artisan) return res.status(404).json({ error: "Artisan non trouvé" });
    res.json(artisan);
  } catch (err) {
    console.error("Erreur GET /api/artisans/:id:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// 👉 POST /api/artisans (création)
router.post("/", async (req, res) => {
  try {
    const { nom, note, localisation, id_specialite } = req.body;
    const artisan = await Artisan.create({
      nom,
      note,
      localisation,
      id_specialite,
    });
    res.status(201).json(artisan);
  } catch (err) {
    console.error("Erreur POST /api/artisans:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// 👉 PUT /api/artisans/:id (mise à jour)
router.put("/:id", async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) return res.status(404).json({ error: "Artisan non trouvé" });

    await artisan.update(req.body);
    res.json(artisan);
  } catch (err) {
    console.error("Erreur PUT /api/artisans/:id:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// 👉 DELETE /api/artisans/:id (suppression)
router.delete("/:id", async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) return res.status(404).json({ error: "Artisan non trouvé" });

    await artisan.destroy();
    res.json({ message: "Artisan supprimé" });
  } catch (err) {
    console.error("Erreur DELETE /api/artisans/:id:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
