const nodemailer = require("nodemailer");
const Artisan = require("../models/Artisan");

exports.sendContactEmail = async (req, res) => {
  const { id } = req.params;
  const { nom, email, objet, message } = req.body;

  try {
    const artisan = await Artisan.findByPk(id);
    if (!artisan || !artisan.email) {
      return res
        .status(404)
        .json({ error: "Artisan introuvable ou sans email" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: artisan.email,
      subject: `Contact depuis Trouve ton artisan : ${objet}`,
      text: `Message de ${nom} (${email}) :\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Email envoyé avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
