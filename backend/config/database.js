const { Sequelize } = require("sequelize");

// Connexion directe à Railway (Public Network URL)
const sequelize = new Sequelize(
  "mysql://user:password@yamabiko.proxy.rlwy.net:3306/database",
  {
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // nécessaire pour Railway
      },
    },
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion DB réussie");
    await sequelize.sync({ alter: true });
    console.log("✅ Tables créées/mises à jour");
  } catch (err) {
    console.error("❌ Erreur de connexion DB:", err.message);
  }
})();

module.exports = { sequelize };
