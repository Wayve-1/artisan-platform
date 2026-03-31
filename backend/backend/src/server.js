const app = require("../app.js");

console.log("Render DB_HOST:", process.env.DB_HOST);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
