const express = require("express");
const router = express.Router();
const { Categorie } = require("../../models");

// GET /api/categories
router.get("/", async (req, res) => {
  try {
    const categories = await Categorie.findAll({
      attributes: ["id", "nom", "slug"],
      order: [["id", "ASC"]],
    });
    res.json(categories);
  } catch (err) {
    console.error("Erreur GET /api/categories:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
