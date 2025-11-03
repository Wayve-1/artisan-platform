const express = require("express");
const router = express.Router();
const artisanController = require("../controllers/artisan.controller");
const auth = require("../middleware/auth");
const {
  validateArtisan,
  validateArtisanUpdate,
} = require("../middleware/artisanValidator");

// Routes publiques
router.get("/artisans", (req, res) => {
  if (req.query.localisation) {
    return artisanController.getArtisansByLocalisation(req, res);
  }
  if (req.query.categorie) {
    return artisanController.getArtisansByCategorie(req, res);
  }
  return artisanController.getAllArtisans(req, res);
});

router.get("/artisans/:id", artisanController.getArtisanById);

// Routes protégées
router.post(
  "/artisans",
  auth,
  validateArtisan,
  artisanController.createArtisan
);

router.put(
  "/artisans/:id",
  auth,
  validateArtisanUpdate,
  artisanController.updateArtisan
);

router.delete("/artisans/:id", auth, artisanController.deleteArtisan);

module.exports = router;
