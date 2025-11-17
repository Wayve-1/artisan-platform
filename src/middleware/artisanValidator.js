const { body } = require("express-validator");

exports.validateArtisan = [
  body("nom").notEmpty().withMessage("Le nom est obligatoire"),
  body("email").isEmail().withMessage("Email invalide"),
  body("note")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("La note doit être entre 0 et 5"),
  body("id_specialite")
    .isInt()
    .withMessage("id_specialite doit être un entier"),
];

exports.validateArtisanUpdate = [
  body("nom").optional().notEmpty().withMessage("Le nom ne peut pas être vide"),
  body("email").optional().isEmail().withMessage("Email invalide"),
  body("note")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("La note doit être entre 0 et 5"),
  body("id_specialite")
    .optional()
    .isInt()
    .withMessage("id_specialite doit être un entier"),
];
