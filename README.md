# artisan-platform

![Node.js](https://img.shields.io/badge/Node.js-18-green)
![Express](https://img.shields.io/badge/Express-4-lightgrey)
![MySQL](https://img.shields.io/badge/MySQL-8-blue)
![React](https://img.shields.io/badge/React-18-61dafb)

## 📚 Sommaire

- [Objectif](#objectif)
- [Structure du projet](#structure-du-projet)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Lancement](#lancement)
- [Routes disponibles](#routes-disponibles)
- [Authentification](#authentification)
- [Exemple de test avec Postman](#exemple-de-test-avec-postman)
- [Fonctionnalités principales](#fonctionnalités-principales)
- [Vérification rapide](#vérification-rapide)

## Objectif

Cette plateforme permet aux particuliers de trouver facilement un artisan de la région Auvergne-Rhône-Alpes et de le contacter via un formulaire en ligne.
Il s'agit d'une API REST construite avec Node.js, Express et MySQL pour gérer des artisans, leurs spécialités et catégories.  
Elle inclut une authentification par token, une validation des données et un système de contact avec envoi d’emails via Mailtrap.

---

## Structure du projet

backend/
├── app.js
├── src/
│ ├── config/ # Configuration (DB, etc.)
│ ├── controllers/ # Logique métier
│ ├── middleware/ # Authentification, validation
│ ├── models/ # Modèles Sequelize
│ ├── routes/ # Routes Express
│ └── validators/ # Validation des données
└── db/
└── create.sql # Script de création de la base

## Technologies utilisées

- **Frontend :** ReactJS, Bootstrap, Sass
- **Backend :** Node.js, Express, Sequelize
- **Base de données :** MySQL
- **Versioning :** Git & GitHub
- **Hébergement :**
  - Frontend : Vercel
  - Backend : Render

## Installation

1. Cloner le projet :

   git clone https://github.com/tonUser/artisan-backend.git
   cd artisan/backend

2. Installer les dépendances :
   npm install

3. Créer un fichier .env à la racine du dossier backend :
   API_TOKEN=tonTokenSecret
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=motdepasse
   DB_NAME=artisan_db
   MAIL_HOST=sandbox.smtp.mailtrap.io
   MAIL_PORT=2525
   MAIL_USER=tonUserMailtrap
   MAIL_PASS=tonPassMailtrap

## Lancement

1. Démarrer le serveur en mode développement :
   npm run dev ou node app.js

2. Serveur accessible :
   http://localhost:3000

3. Connexion MySQL réussi, console :
   ✅ Connexion MySQL réussie
   🟢 Serveur lancé sur http://localhost:3000

---

## Étape suivante : Documentation des routes

## Routes disponibles

### Artisans

- `GET /artisans` → Récupère tous les artisans
- `GET /artisans/:id` → Récupère un artisan par son ID
- `POST /artisans` → Crée un artisan (**protégé**, nécessite un token)
- `PUT /artisans/:id` → Met à jour un artisan (**protégé**, nécessite un token)
- `DELETE /artisans/:id` → Supprime un artisan (**protégé**, nécessite un token)

### Catégories

- `GET /categories` → Récupère toutes les catégories
- `GET /categories/:id` → Récupère une catégorie par son ID

### Spécialités

- `GET /specialites` → Récupère toutes les spécialités
- `GET /specialites/:id` → Récupère une spécialité par son ID

### Contact

- `POST /contact/:id` → Envoie un message à un artisan (via Mailtrap)

## Authentification

Certaines routes (POST, PUT, DELETE) sont protégées par un token.  
Pour y accéder, vous devez ajouter un header HTTP `Authorization` avec le format suivant :
Authorization: Bearer VOTRE_TOKEN_SECRET

## Exemple de test avec Postman

### Créer un artisan (route protégée)

1. Ouvrir Postman et créer une nouvelle requête.
2. Méthode : **POST**
3. URL : `http://localhost:3000/artisans`
4. Onglet **Headers** :
   - `Authorization` → `Bearer VOTRE_TOKEN_SECRET`
   - `Content-Type` → `application/json`
5. Onglet **Body** → choisir `raw` + `JSON` et insérer :
   ```json
   {
     "nom": "Artisan Test",
     "email": "test@mail.com",
     "note": 5,
     "id_specialite": 1
   }
   ```

### Contacter un artisan (route publique)

1. Méthode : **POST**
2. URL : `http://localhost:3000/contact/1` (remplacer 1 par l’ID d’un artisan existant)
3. Onglet **Body** → `raw` + `JSON` :

   ```json
   {
     "nom": "example",
     "email": "example@test.com",
     "message": "Bonjour, je suis intéressé par vos services"
   }

   4. Cliquer sur Send → réponse attendue :
   { "message": "Email envoyé avec succès" }

   ```

4. Le mail apparaît ensuite dans votre inbox Mailtrap.

   ```

   ```

## Fonctionnalités principales

- Recherche d’artisans par catégorie et spécialité
- Filtrage dynamique côté frontend
- Formulaire de contact avec envoi d’email (Mailtrap)
- Authentification par token pour sécuriser les routes sensibles
- Base de données relationnelle cohérente (catégories → spécialités → artisans)

## Modèle conceptuel de données (MCD)

Le schéma complet est disponible dans le PDF rendu avec ce projet.

## Améliorations futures

- Tableau de bord administrateur pour gérer artisans, catégories et spécialités
- Gestion des avis clients et notes détaillées
- Upload de photos pour les artisans
- Optimisation SEO et accessibilité renforcée

## Auteur

Projet réalisé par **Wayve** dans le cadre du module _Développement Web Fullstack_.

## Vérification rapide

1. Lancer le backend avec `npm run dev`
2. Vérifier la connexion MySQL (message ✅ dans la console)
3. Tester les routes avec Postman ou depuis le frontend
4. Vérifier que les filtres par catégorie renvoient les bons artisans
