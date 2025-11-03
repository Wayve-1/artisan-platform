const express = require("express");
const router = express.Router();
const categorieController = require("../controllers/categorie.controller");

console.log("✅ categorie.routes.js bien chargé");
router.get("/categories", categorieController.getAllCategories);
router.get(
  "/categories/:id/specialites",
  categorieController.getSpecialitesByCategorie
);

module.exports = router;
