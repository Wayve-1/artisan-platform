const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");

router.post("/contact/:id", contactController.sendContactEmail);

module.exports = router;
