-- Création de la base

CREATE DATABASE IF NOT EXISTS artisans_db 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE artisans_db;

-- Création des tables

CREATE TABLE categorie (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL
);

CREATE TABLE specialite (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  id_categorie INT NOT NULL,
  FOREIGN KEY (id_categorie) REFERENCES categorie(id)
);

CREATE TABLE artisan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  note FLOAT,
  localisation VARCHAR(255),
  image VARCHAR(255),
  email VARCHAR(255),
  site_web VARCHAR(255),
  id_specialite INT NOT NULL,
  FOREIGN KEY (id_specialite) REFERENCES specialite(id)
);
