const { Sequelize } = require("sequelize");

// On ne charge dotenv que si on est en local
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

console.log("=== DEBUG ENV VARS ===");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "****" : undefined);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("=======================");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connexion DB réussie");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("✅ Tables créées/mises à jour");
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion DB:", err);
  });

module.exports = { sequelize };
