-- Création de la base
CREATE DATABASE IF NOT EXISTS artisans_db 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE artisans_db;

CREATE TABLE categorie (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  slug VARCHAR(150) NOT NULL UNIQUE
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
  description VARCHAR(255),
  id_specialite INT NOT NULL,
  FOREIGN KEY (id_specialite) REFERENCES specialite(id)
);

INSERT INTO categorie (nom, slug) VALUES
('Alimentation', 'alimentation'),   -- id = 1
('Bâtiment', 'batiment'),           -- id = 2
('Fabrication', 'fabrication'),     -- id = 3
('Services', 'services');           -- id = 4

INSERT INTO specialite (nom, id_categorie) VALUES
-- Alimentation
('Boucher', 1),     
('Boulanger', 1),   
('Chocolatier', 1), 
('Traiteur', 1),    

-- Bâtiment
('Chauffagiste', 2),
('Electricien', 2), 
('Menuisier', 2),   
('Plombier', 2),    

-- Fabrication
('Bijoutier', 3),   
('Couturier', 3),   
('Ferronier', 3),   

-- Services
('Coiffeur', 4),    
('Fleuriste', 4),   
('Toiletteur', 4),  
('Webdesign', 4);   

INSERT INTO artisan (nom, note, localisation, description, image, email, site_web, id_specialite) VALUES
-- Alimentation
('Boucherie Dumont', 4.5, 'Lyon', 'Lorem ipsum dolor sit amet...', 'images/artisans/boucher.jpg', 'boucherie.dumond@gmail.com', NULL, 1),
('Au pain chaud', 4.8, 'Montélimar', 'Lorem ipsum dolor sit amet...', 'images/artisans/boulanger.jpg', 'aupainchaud@hotmail.com', NULL, 2),
('Chocolaterie Labbé', 4.9, 'Lyon', 'Lorem ipsum dolor sit amet...', 'images/artisans/chocolatier.jpg', 'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', 3),
('Traiteur Truchon', 4.1, 'Lyon', 'Lorem ipsum dolor sit amet...', 'images/artisans/traiteur.jpg', 'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', 4),
('Orville Salmons', 5.0, 'Evian', 'Lorem ipsum dolor sit amet...', 'images/artisans/boulanger2.jpg', 'o-salmons@live.com', NULL, 2),

-- Bâtiment
('Mont Blanc Electricité', 4.5, 'Chamonix', 'Lorem ipsum dolor sit amet...', 'images/artisans/electricien.jpg', 'contact@mont-blanc-electricite.com', 'https://mont-blanc-electricite.com', 6),
('Boutot & fils', 4.7, 'Bourg-en-bresse', 'Lorem ipsum dolor sit amet...', 'images/artisans/menuisier.jpg', 'boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.com', 7),
('Vallis Bellemare', 4.0, 'Vienne', 'Lorem ipsum dolor sit amet...', 'images/artisans/plombier.jpg', 'v.bellemare@gmail.com', 'https://plomberie-bellemare.com', 8),

-- Fabrication
('Claude Quinn', 4.2, 'Aix-les-bains', 'Lorem ipsum dolor sit amet...', 'images/artisans/bijoutier.jpg', 'claude.quinn@gmail.com', NULL, 9),
('Amitee Lécuyer', 4.5, 'Annecy', 'Lorem ipsum dolor sit amet...', 'images/artisans/couturier.jpg', 'a.amitee@hotmail.com', 'https://lecuyer-couture.com', 10),
('Ernest Carignan', 5.0, 'Le Puy-en-Velay', 'Lorem ipsum dolor sit amet...', 'images/artisans/ferronier.jpg', 'e-carigan@hotmail.com', NULL, 11),

-- Services
('Royden Charbonneau', 3.8, 'Saint-Priest', 'Lorem ipsum dolor sit amet...', 'images/artisans/coiffeur1.jpg', 'r.charbonneau@gmail.com', NULL, 12),
('Leala Dennis', 3.8, 'Chambéry', 'Lorem ipsum dolor sit amet...', 'images/artisans/coiffeur2.jpg', 'l.dennos@hotmail.fr', 'https://coiffure-leala-chambery.fr', 12),
('C''est sup''hair', 4.1, 'Romans-sur-Isère', 'Lorem ipsum dolor sit amet...', 'images/artisans/coiffeur3.jpg', 'sup-hair@gmail.com', 'https://sup-hair.fr', 12),
('Le monde des fleurs', 4.6, 'Annonay', 'Lorem ipsum dolor sit amet...', 'images/artisans/fleuriste.jpg', 'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr', 13),
('Valérie Laderoute', 4.5, 'Valence', 'Lorem ipsum dolor sit amet...', 'images/artisans/toiletteur.jpg', 'v-laredoute@gmail.com', NULL, 14),
('CM Graphisme', 4.4, 'Valence', 'Lorem ipsum dolor sit amet...', 'images/artisans/webdesign.jpg', 'contact@cm-graphisme.com', 'https://cm-graphisme.com', 15);
