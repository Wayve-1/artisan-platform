require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ error: "Accès interdit" });
  }

  // Découpe "Bearer monSuperToken123" → ["Bearer", "monSuperToken123"]
  console.log("Header reçu :", req.headers["authorization"]);
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(403).json({ error: "Format du token invalide" });
  }

  const token = parts[1];

  if (token !== process.env.API_TOKEN) {
    return res.status(403).json({ error: "Accès interdit" });
  }

  next();
};
