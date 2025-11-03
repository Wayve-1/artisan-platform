const express = require("express");
const router = express.Router();
const specialiteController = require("../controllers/specialite.controller");

router.get("/specialites", specialiteController.getAllSpecialites);
router.get("/specialites/:id", specialiteController.getSpecialiteById);
router.get(
  "/specialites/:id/artisans",
  specialiteController.getArtisansBySpecialite
);

module.exports = router;
