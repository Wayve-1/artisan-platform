const express = require("express");
const router = express.Router();
const Specialite = require("../../models");

// GET /api/specialites
router.get("/", async (req, res) => {
  try {
    const specialites = await Specialite.findAll();
    res.json(specialites);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET /api/specialites/:id
router.get("/:id", async (req, res) => {
  try {
    const specialite = await Specialite.findByPk(req.params.id);
    if (!specialite)
      return res.status(404).json({ error: "Spécialité non trouvée" });
    res.json(specialite);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
