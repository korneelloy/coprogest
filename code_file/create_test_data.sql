-- utilisateurs

INSERT INTO person (id, email, password, first_name, last_name, street, postal_code, city, telephone, id_role) VALUES
('38522c35-d231-49f7-9db3-83c9d7084fe4', 'manager@gmail.com', '$2b$10$IzgzYkKv9bWLk1XaMNkLa.CbPQhsLY9dTATV.FXmpAp0sTw3j1ds6', 'Ann', 'TheManager', '12 rue de la République', '75001', 'Paris', '06 12 34 56 78', '9663d291-1a31-40a0-b5b1-7f73140bd5cc'),
('38522c35-d231-49f7-9db3-83c9d7084fe5', 'assitant@gmail.com', '$2b$10$IzgzYkKv9bWLk1XaMNkLa.CbPQhsLY9dTATV.FXmpAp0sTw3j1ds6', 'John', 'TheAssistant', '12 rue de la République', '75001', 'Paris', '06 12 34 56 78', '0641e7ea-d13d-46a3-86c2-6dcba6cd320c'),
('38522c35-d231-49f7-9db3-83c9d7084fe6', 'coowner@gmail.com', '$2b$10$IzgzYkKv9bWLk1XaMNkLa.CbPQhsLY9dTATV.FXmpAp0sTw3j1ds6', 'Cloe', 'TheSimpleCoOwner', '12 rue de la République', '75001', 'Paris', '06 12 34 56 78', '5041878f-2523-41d0-97b1-cd05bc60f1b8'),
('38522c35-d231-49f7-9db3-83c9d7084fe2', 'slaamri@yahoo.fr', '$2b$10$IzgzYkKv9bWLk1XaMNkLa.CbPQhsLY9dTATV.FXmpAp0sTw3j1ds6', 'Saïd', 'Laamri', '12 rue de la République', '75001', 'Paris', '06 12 34 56 78', '9663d291-1a31-40a0-b5b1-7f73140bd5cc'),
('38522c35-d231-49f7-9db3-83c9d7084fe3', 'korneelloy@yahoo.com', '$2b$10$IzgzYkKv9bWLk1XaMNkLa.CbPQhsLY9dTATV.FXmpAp0sTw3j1ds6', 'Korneel', 'Loy', '12 rue de la République', '75001', 'Paris', '06 12 34 56 78', '9663d291-1a31-40a0-b5b1-7f73140bd5cc'),
('38522c35-d231-49f7-9db3-83c9d7084fe1', 'kevin.martin@example.fr', '$2b$10$IzgzYkKv9bWLk1XaMNkLa.CbPQhsLY9dTATV.FXmpAp0sTw3j1ds6', 'Kevin', 'Martin', '12 rue de la République', '75001', 'Paris', '06 12 34 56 78', '9663d291-1a31-40a0-b5b1-7f73140bd5cc'),
('bc685517-2e92-4cad-8138-47af1db44f8b', 'johnny.dupont@orange.fr', '$2b$10$IzgzYkKv9bWLk1XaMNkLa.CbPQhsLY9dTATV.FXmpAp0sTw3j1ds6', 'Johnny', 'Dupont', '8 avenue des Champs', '69003', 'Lyon', '07 98 76 54 32', '0641e7ea-d13d-46a3-86c2-6dcba6cd320c'),
('2011ba64-274b-475e-938d-bf4f416d2e34', 'catherine.leroy@gmail.com', '$2b$10$IzgzYkKv9bWLk1XaMNkLa.CbPQhsLY9dTATV.FXmpAp0sTw3j1ds6', 'Catherine', 'Leroy', '3 impasse Victor Hugo', '34000', 'Montpellier', '06 45 23 67 89', '0641e7ea-d13d-46a3-86c2-6dcba6cd320c'),
('666044ba-5e19-46d9-ad61-7e1987f6cdaa', 'julie.morel@laposte.net', '$2b$10$IzgzYkKv9bWLk1XaMNkLa.CbPQhsLY9dTATV.FXmpAp0sTw3j1ds6', 'Julie', 'Morel', '56 boulevard Voltaire', '33000', 'Bordeaux', '07 11 22 33 44','5041878f-2523-41d0-97b1-cd05bc60f1b8'),
('0715c4b6-ebd7-4dbb-a695-57692207f985', 'monica.faure@protonmail.com', '$2b$10$IzgzYkKv9bWLk1XaMNkLa.CbPQhsLY9dTATV.FXmpAp0sTw3j1ds6', 'Monica', 'Faure', '27 place de l’Église', '06000', 'Nice', '06 99 88 77 66', '5041878f-2523-41d0-97b1-cd05bc60f1b8'),
('c2411233-ad0a-43f1-8e2d-c9e7d003b237', 'samuel.durand@free.fr', '$2b$10$IzgzYkKv9bWLk1XaMNkLa.CbPQhsLY9dTATV.FXmpAp0sTw3j1ds6', 'Samuel', 'Durand', '104 chemin du Moulin', '13090', 'Aix-en-Provence', '07 65 43 21 09', '5041878f-2523-41d0-97b1-cd05bc60f1b8'),
('b6994850-a1e2-4f87-ba5d-2b0b846834ed', 'daniel.leclerc@hotmail.fr', '$2b$10$IzgzYkKv9bWLk1XaMNkLa.CbPQhsLY9dTATV.FXmpAp0sTw3j1ds6', 'Daniel', 'Leclerc', '17 allée des Tilleuls', '67000', 'Strasbourg', '06 78 12 98 34', '5041878f-2523-41d0-97b1-cd05bc60f1b8'),
('3dbdf433-96e2-4256-82df-09a3f241be44', 'jessica.perrin@wanadoo.fr', '$2b$10$IzgzYkKv9bWLk1XaMNkLa.CbPQhsLY9dTATV.FXmpAp0sTw3j1ds6', 'Jessica', 'Perrin', '42 rue des Lilas', '31000', 'Toulouse', '06 01 23 45 67', '5041878f-2523-41d0-97b1-cd05bc60f1b8'),
('7a7fb120-372c-4ebb-9f77-604a56e778eb', 'michael.bernard@mayer.fr', '$2b$10$IzgzYkKv9bWLk1XaMNkLa.CbPQhsLY9dTATV.FXmpAp0sTw3j1ds6', 'Michael', 'Bernard', '95 quai de la Loire', '44000', 'Nantes', '07 84 21 56 33', '5041878f-2523-41d0-97b1-cd05bc60f1b8'),
('c6bdd364-85fb-4b7a-afc7-71ef424f30dc', 'kevin.romero@numericable.fr', '$2b$10$IzgzYkKv9bWLk1XaMNkLa.CbPQhsLY9dTATV.FXmpAp0sTw3j1ds6', 'Kevin', 'Romero', '23 rue Jean Jaurès', '80000', 'Amiens', '06 73 59 48 20', '5041878f-2523-41d0-97b1-cd05bc60f1b8');

-- units

INSERT INTO unit (id, name, shares, description, id_person) VALUES
('c12cb34b-6448-4059-91ad-6881d9bbd20c', 'Lot 1', 130, 'Appartement 1er étage gauche', '2011ba64-274b-475e-938d-bf4f416d2e34'),
('dbfd0774-0f81-4e6b-9015-cdec8a7d1ecd', 'Lot 2', 95, 'Appartement 1er étage droite',  '7a7fb120-372c-4ebb-9f77-604a56e778eb'),
('c9f71085-845d-46c7-809d-3453b847fbbd', 'Lot 3', 120, 'Appartement 2e étage gauche',  '38522c35-d231-49f7-9db3-83c9d7084fe1'),
('7f86f914-d31c-496d-a4f5-f315af1b97b0', 'Lot 4', 110, 'Appartement 2e étage droite', 'c2411233-ad0a-43f1-8e2d-c9e7d003b237'),
('aceceac2-ae4c-4354-b08a-7720f203263d', 'Lot 5', 90, 'Studio rez-de-chaussée gauche', '666044ba-5e19-46d9-ad61-7e1987f6cdaa'),
('ff756164-ed9f-42b2-9f94-0e081654803b', 'Lot 6', 85, 'Studio rez-de-chaussée droite', 'c2411233-ad0a-43f1-8e2d-c9e7d003b237'),
('481a87e1-2f12-41d4-8ed5-edbfad94a8bb', 'Lot 7', 105, 'Appartement 3e étage gauche',  'b6994850-a1e2-4f87-ba5d-2b0b846834ed'),
('f1c436e9-e292-4b4c-92c3-134dbd87fb3c', 'Lot 8', 80, 'Appartement 3e étage droite',  '0715c4b6-ebd7-4dbb-a695-57692207f985'),
('241b21e4-cca7-43eb-b016-88ef27cd41c4', 'Lot 9', 85, 'Appartement 4e étage gauche',  '7a7fb120-372c-4ebb-9f77-604a56e778eb'),
('49e30d14-5a45-451e-9abc-e777aca94261', 'Lot 10', 100, 'Appartement 4e étage droite', 'c6bdd364-85fb-4b7a-afc7-71ef424f30dc');

-- unitgroups

INSERT INTO unit_group (id, name, description, special_shares) VALUES
('8884093a-92c9-4347-a34d-0457a6a2d2bc', 'Tous les appartements', 'La totalité des lots', false),
('8884093a-92c9-4347-a34d-0457a6a2d2bd', 'Ascenseur', 'Les lots desservis par l’ascenseur', true),
('8884093a-92c9-4347-a34d-0457a6a2d2be', 'Escalier A', 'Les lots situés dans la cage A', false),
('8884093a-92c9-4347-a34d-0457a6a2d2bf', 'Escalier B', 'Les lots situés dans la cage B', false),
('8884093a-92c9-4347-a34d-0457a6a2d2c0', 'Parkings', 'Les lots de stationnement au sous-sol', false);

-- unit_unitgroups

INSERT INTO unit_unit_group (id_unit, id_unit_group, adjusted_shares) VALUES
-- Tous les lots dans 'Tous les appartements'
('c12cb34b-6448-4059-91ad-6881d9bbd20c', '8884093a-92c9-4347-a34d-0457a6a2d2bc', NULL),
('dbfd0774-0f81-4e6b-9015-cdec8a7d1ecd', '8884093a-92c9-4347-a34d-0457a6a2d2bc', NULL),
('c9f71085-845d-46c7-809d-3453b847fbbd', '8884093a-92c9-4347-a34d-0457a6a2d2bc', NULL),
('7f86f914-d31c-496d-a4f5-f315af1b97b0', '8884093a-92c9-4347-a34d-0457a6a2d2bc', NULL),
('aceceac2-ae4c-4354-b08a-7720f203263d', '8884093a-92c9-4347-a34d-0457a6a2d2bc', NULL),
('ff756164-ed9f-42b2-9f94-0e081654803b', '8884093a-92c9-4347-a34d-0457a6a2d2bc', NULL),
('481a87e1-2f12-41d4-8ed5-edbfad94a8bb', '8884093a-92c9-4347-a34d-0457a6a2d2bc', NULL),
('f1c436e9-e292-4b4c-92c3-134dbd87fb3c', '8884093a-92c9-4347-a34d-0457a6a2d2bc', NULL),
('241b21e4-cca7-43eb-b016-88ef27cd41c4', '8884093a-92c9-4347-a34d-0457a6a2d2bc', NULL),
('49e30d14-5a45-451e-9abc-e777aca94261', '8884093a-92c9-4347-a34d-0457a6a2d2bc', NULL),

-- Ascenseur (appartements à partir du 2e étage)
('c9f71085-845d-46c7-809d-3453b847fbbd', '8884093a-92c9-4347-a34d-0457a6a2d2bd', 120.00),
('7f86f914-d31c-496d-a4f5-f315af1b97b0', '8884093a-92c9-4347-a34d-0457a6a2d2bd', 110.00),
('481a87e1-2f12-41d4-8ed5-edbfad94a8bb', '8884093a-92c9-4347-a34d-0457a6a2d2bd', 105.00),
('f1c436e9-e292-4b4c-92c3-134dbd87fb3c', '8884093a-92c9-4347-a34d-0457a6a2d2bd', 80.00),
('241b21e4-cca7-43eb-b016-88ef27cd41c4', '8884093a-92c9-4347-a34d-0457a6a2d2bd', 85.00),
('49e30d14-5a45-451e-9abc-e777aca94261', '8884093a-92c9-4347-a34d-0457a6a2d2bd', 100.00),

-- Escalier A (Lots impairs)
('c12cb34b-6448-4059-91ad-6881d9bbd20c', '8884093a-92c9-4347-a34d-0457a6a2d2be', NULL),
('c9f71085-845d-46c7-809d-3453b847fbbd', '8884093a-92c9-4347-a34d-0457a6a2d2be', NULL),
('aceceac2-ae4c-4354-b08a-7720f203263d', '8884093a-92c9-4347-a34d-0457a6a2d2be', NULL),
('481a87e1-2f12-41d4-8ed5-edbfad94a8bb', '8884093a-92c9-4347-a34d-0457a6a2d2be', NULL),
('241b21e4-cca7-43eb-b016-88ef27cd41c4', '8884093a-92c9-4347-a34d-0457a6a2d2be', NULL),

-- Escalier B (Lots pairs)
('dbfd0774-0f81-4e6b-9015-cdec8a7d1ecd', '8884093a-92c9-4347-a34d-0457a6a2d2bf', NULL),
('7f86f914-d31c-496d-a4f5-f315af1b97b0', '8884093a-92c9-4347-a34d-0457a6a2d2bf', NULL),
('ff756164-ed9f-42b2-9f94-0e081654803b', '8884093a-92c9-4347-a34d-0457a6a2d2bf', NULL),
('f1c436e9-e292-4b4c-92c3-134dbd87fb3c', '8884093a-92c9-4347-a34d-0457a6a2d2bf', NULL),
('49e30d14-5a45-451e-9abc-e777aca94261', '8884093a-92c9-4347-a34d-0457a6a2d2bf', NULL),

-- Parkings (attribués à certains appartements uniquement)
('c12cb34b-6448-4059-91ad-6881d9bbd20c', '8884093a-92c9-4347-a34d-0457a6a2d2c0', 85.00),
('7f86f914-d31c-496d-a4f5-f315af1b97b0', '8884093a-92c9-4347-a34d-0457a6a2d2c0', 80.00),
('ff756164-ed9f-42b2-9f94-0e081654803b', '8884093a-92c9-4347-a34d-0457a6a2d2c0', 50.00),
('241b21e4-cca7-43eb-b016-88ef27cd41c4', '8884093a-92c9-4347-a34d-0457a6a2d2c0', 50.00);



-- Document categories

INSERT INTO document_category (id, name) VALUES
('274b6eb5-00ef-4a2e-a0a7-682c3e7d2103', 'General'),
('274b6eb5-00ef-4a2e-a0a7-682c3e7d2104', 'Compte rendu AG'),
('274b6eb5-00ef-4a2e-a0a7-682c3e7d2105', 'Factures'),
('274b6eb5-00ef-4a2e-a0a7-682c3e7d2106', 'Réglement de copropriété'),
('274b6eb5-00ef-4a2e-a0a7-682c3e7d2107', 'Rapports techniques'),
('274b6eb5-00ef-4a2e-a0a7-682c3e7d2108', 'Assurances');

-- Documents

INSERT INTO document (id, name, description, url, id_document_category) VALUES
('a1e7d5c1-1111-4b1a-aaa1-000000000001', 'Facture Eau Janvier', 'Facture mensuelle pour la consommation d eau', 'https://example.com/docs/eau-janvier.pdf', '274b6eb5-00ef-4a2e-a0a7-682c3e7d2105'),
('a1e7d5c1-1111-4b1a-aaa1-000000000002', 'Facture Eau Février', 'Facture mensuelle pour la consommation d eau', 'https://example.com/docs/eau-fevrier.pdf',  '274b6eb5-00ef-4a2e-a0a7-682c3e7d2105'),
('a1e7d5c1-1111-4b1a-aaa1-000000000003', 'Facture EDF Janvier', 'Facture électricité de janvier', 'https://example.com/docs/edf-janvier.pdf',  '274b6eb5-00ef-4a2e-a0a7-682c3e7d2105'),
('a1e7d5c1-1111-4b1a-aaa1-000000000004', 'Facture EDF Février', 'Facture électricité de février', 'https://example.com/docs/edf-fevrier.pdf',  '274b6eb5-00ef-4a2e-a0a7-682c3e7d2105'),
('a1e7d5c1-1111-4b1a-aaa1-000000000005', 'Contrat Entretien Chaudière', 'Contrat annuel pour l entretien de la chaudière collective', 'https://example.com/docs/entretien-chaudiere.pdf',  '274b6eb5-00ef-4a2e-a0a7-682c3e7d2107'),
('a1e7d5c1-1111-4b1a-aaa1-000000000006', 'Rapport Entretien Ascenseur', 'Rapport de maintenance semestriel', 'https://example.com/docs/ascenseur.pdf',  '274b6eb5-00ef-4a2e-a0a7-682c3e7d2107'),
('a1e7d5c1-1111-4b1a-aaa1-000000000007', 'Planning Nettoyage Janvier', 'Planning des tâches de nettoyage pour janvier', 'https://example.com/docs/nettoyage-janvier.pdf',  '274b6eb5-00ef-4a2e-a0a7-682c3e7d2103'),
('a1e7d5c1-1111-4b1a-aaa1-000000000008', 'Planning Nettoyage Février', 'Planning des tâches de nettoyage pour février', 'https://example.com/docs/nettoyage-fevrier.pdf',  '274b6eb5-00ef-4a2e-a0a7-682c3e7d2103'),
('a1e7d5c1-1111-4b1a-aaa1-000000000009', 'Rapport Eau', 'Analyse qualité de l eau fournie', 'https://example.com/docs/rapport-eau.pdf',  '274b6eb5-00ef-4a2e-a0a7-682c3e7d2107'),
('a1e7d5c1-1111-4b1a-aaa1-000000000010', 'Bilan Entretien Annuel', 'Bilan des interventions d entretien sur l année', 'https://example.com/docs/bilan-entretien.pdf',  '274b6eb5-00ef-4a2e-a0a7-682c3e7d2107');


-- Budget categories

INSERT INTO budget_category (id, name) VALUES
('41730a00-f81e-48d8-9b3a-4ae9fcb187eb', 'eau'),
('41730a00-f81e-48d8-9b3a-4ae9fcb187ec', 'electricité'),
('41730a00-f81e-48d8-9b3a-4ae9fcb187ed', 'entretien'),
('41730a00-f81e-48d8-9b3a-4ae9fcb187ee', 'nettoyage');
('41730a00-f81e-48d8-9b3a-4ae9fcb187ey', 'Travaux');



-- ag notices

INSERT INTO ag_notice (id, title, place, ag_date) VALUES
('3ae8b1cd-e2c2-4685-b1b0-f387de61b588', 'AG janvier 2024', 'Chez M Martin, appartement 10', '2024-01-04 17:00:00'),
('3ae8b1cd-e2c2-4685-b1b0-f387de61b589', 'AG janvier 2023', 'Chez Mme Leroy, appartement 2', '2023-01-16 15:00:00'),
('3ae8b1cd-e2c2-4685-b1b0-f387de61b590', 'AG juillet 2025', 'Salle commune, rez-de-chaussée', '2025-07-02 18:30:00'),
('3ae8b1cd-e2c2-4685-b1b0-f387de61b591', 'AG septembre 2024', 'Chez Mme Dubois, appartement 4', '2024-09-10 19:00:00'),
('3ae8b1cd-e2c2-4685-b1b0-f387de61b592', 'AG juin 2022', 'Chez M. Morel, appartement 7', '2022-06-28 18:00:00'),
('3ae8b1cd-e2c2-4685-b1b0-f387de61b593', 'AG mars 2021', 'Chez Mme Petit, appartement 1', '2021-03-15 14:00:00'),
('3ae8b1cd-e2c2-4685-b1b0-f387de61b594', 'AG novembre 2023', 'Salle polyvalente du quartier', '2023-11-20 18:00:00'),
('3ae8b1cd-e2c2-4685-b1b0-f387de61b595', 'AG avril 2024', 'Chez M. Lefèvre, appartement 3', '2024-04-08 17:30:00'),
('3ae8b1cd-e2c2-4685-b1b0-f387de61b596', 'AG mai 2022', 'Chez Mme Garnier, appartement 5', '2022-05-19 16:00:00'),
('3ae8b1cd-e2c2-4685-b1b0-f387de61b597', 'AG octobre 2021', 'Chez M. Bernard, appartement 6', '2021-10-05 18:00:00');

-- resolutions

INSERT INTO ag_resolution (id, title, resolution_text, required_majority, budget, budget_amount, id_ag_minutes, id_unit_group, id_ag_notice) VALUES
('5d088a30-d1f4-4f8f-81e5-15cb4531ddc3', 'Réfection de la cage d escalier', 'Les copropriétaire descident de rénover la cage d escalier etc', '24', true, 5000, null, '8884093a-92c9-4347-a34d-0457a6a2d2bc', '3ae8b1cd-e2c2-4685-b1b0-f387de61b588');


INSERT INTO ag_resolution (id, title, resolution_text, required_majority, budget, budget_amount, id_ag_minutes, id_unit_group, id_ag_notice)
VALUES (
  'e1bc33f1-74d2-4ac5-906a-d9e342e8cd30',
  'Travaux de ravalement de façade',
  'Après présentation du diagnostic technique de l’immeuble par le cabinet d’architecture DUPRÉ, il est proposé aux copropriétaires de procéder à un ravalement complet de la façade sur rue, incluant le traitement des fissures, le nettoyage haute pression, la reprise des enduits et la peinture. 
  Le syndic rappelle que ces travaux sont obligatoires selon la réglementation en vigueur à Paris (périodicité décennale).
  Le coût estimé s’élève à 27 400 € TTC.
  La résolution vise à autoriser le syndic à lancer un appel d’offres auprès de trois entreprises et à retenir l’entreprise la plus avantageuse pour la copropriété.
  Si la résolution est votée, un appel de fonds exceptionnel sera établi proportionnellement aux tantièmes.
  La majorité absolue (article 25) est requise.',
  '25',
  true,
  10000,
  null,
  '8884093a-92c9-4347-a34d-0457a6a2d2bc',
  '3ae8b1cd-e2c2-4685-b1b0-f387de61b588'
);

INSERT INTO ag_resolution (id, title, resolution_text, required_majority, budget, budget_amount, id_ag_minutes, id_unit_group, id_ag_notice)
VALUES (
  'fa99bbd4-101b-42f7-a176-25f779a5a2c5',
  'Remplacement du système d’interphone',
  'Le syndic informe les copropriétaires que le système d’interphone est devenu obsolète et génère de nombreuses pannes signalées par les occupants. 
  Il est proposé de remplacer le système analogique actuel par un système numérique avec badges d’accès et possibilité de contrôle via smartphone.
  Le devis de l’entreprise SOSEC s’élève à 8 950 € TTC, installation comprise.
  Les charges seront réparties selon les tantièmes généraux.
  Une majorité simple (article 24) est suffisante pour cette décision.',
  '24',
  true,
  3000,
  null,
  '8884093a-92c9-4347-a34d-0457a6a2d2bc',
  '3ae8b1cd-e2c2-4685-b1b0-f387de61b588'
);

INSERT INTO ag_resolution (id, title, resolution_text, required_majority, budget, budget_amount, id_ag_minutes, id_unit_group, id_ag_notice)
VALUES (
  '15a7271a-4c90-4e56-a979-d55bbf1369f6',
  'Aménagement d’un local à vélos dans le sous-sol',
  'Face à la demande croissante des résidents, il est proposé de transformer une partie du local technique inutilisé au sous-sol en local sécurisé pour vélos. 
  Cette installation comprend des arceaux d’attache, un éclairage à détection de mouvement et un système de fermeture avec badge.
  Le budget, budget_amount,  prévisionnel est de 3 200 € TTC.
  Les copropriétaires devront se prononcer sur la création de ce local et l’affectation de cet espace commun à cet usage.
  Décision soumise à la majorité des voix exprimées des copropriétaires présents ou représentés (article 24).',
  '24',
  true,
  3200,
  null,
  '8884093a-92c9-4347-a34d-0457a6a2d2bc',
  '3ae8b1cd-e2c2-4685-b1b0-f387de61b588'
);

INSERT INTO ag_resolution (id, title, resolution_text, required_majority, budget, id_ag_minutes, id_unit_group, id_ag_notice)
VALUES (
  'b4719013-4982-4709-9316-808ed49c34b1',
  'Changement de syndic',
  'Suite à plusieurs dysfonctionnements signalés par les copropriétaires et un manque de réactivité du syndic actuel, il est proposé de ne pas renouveler le contrat du cabinet SYNDICOOP.
  Deux cabinets concurrents, CABEX et GESTIMMO, ont été consultés et ont présenté leurs offres.
  La résolution consiste à désigner un nouveau syndic, selon les modalités prévues à l’article 25 de la loi de 1965.
  Les contrats sont disponibles en annexe de la convocation.',
  '25',
  false,
  null,
  '8884093a-92c9-4347-a34d-0457a6a2d2bc',
  '3ae8b1cd-e2c2-4685-b1b0-f387de61b588'
);

INSERT INTO ag_resolution (id, title, resolution_text, required_majority, budget, budget_amount, id_ag_minutes, id_unit_group, id_ag_notice)
VALUES (
  '90f94a2d-748b-49ae-94c5-5cf885ca0e47',
  'Réfection cage d’escalier A',
  'Des travaux de peinture et remplacement de luminaires sont proposés pour améliorer l’esthétique et la sécurité de la cage A. Coût estimé : 5 600 € TTC.',
  '25',
  true,
  10000,
  null,
  '8884093a-92c9-4347-a34d-0457a6a2d2be',
  '3ae8b1cd-e2c2-4685-b1b0-f387de61b592'
);

INSERT INTO ag_resolution (id, title, resolution_text, required_majority, budget, budget_amount, id_ag_minutes, id_unit_group, id_ag_notice)
VALUES (
  '27e03eaf-c86f-4ebf-8a6d-29c763c5869f',
  'détecteurs de fumée',
  'Il est proposé d’équiper les couloirs et cages d’escaliers de détecteurs de fumée pour respecter les normes de sécurité incendie.',
  '24',
  true,
  1600,
  null,
  '8884093a-92c9-4347-a34d-0457a6a2d2bc',
  '3ae8b1cd-e2c2-4685-b1b0-f387de61b592'
);

INSERT INTO ag_resolution (id, title, resolution_text, required_majority, budget, budget_amount, id_ag_minutes, id_unit_group, id_ag_notice)
VALUES (
  'f9e86e06-7e53-4381-8e70-bbfedb289ded',
  'Isolation des combles',
  'Une étude thermique a mis en lumière de fortes déperditions au niveau des combles. Le devis pour les travaux d’isolation s’élève à 12 800 € TTC.',
  '25',
  true,
  900,
  null,
  '8884093a-92c9-4347-a34d-0457a6a2d2bc',
  '3ae8b1cd-e2c2-4685-b1b0-f387de61b593'
);

INSERT INTO ag_resolution (id, title, resolution_text, required_majority, budget, budget_amount, id_ag_minutes, id_unit_group, id_ag_notice)
VALUES (
  '0ba5077f-fb1f-4ee5-99e8-4496d2fdfbd1',
  'Installation de panneaux photovoltaïques',
  'Proposition d’installer des panneaux solaires sur le toit pour réduire la facture d’électricité des parties communes. Subventions envisageables. budget, budget_amount,  prévisionnel : 18 000 € TTC.',
  '26',
  true,
  3000,
  null,
  '8884093a-92c9-4347-a34d-0457a6a2d2bc',
  '3ae8b1cd-e2c2-4685-b1b0-f387de61b594'
);


INSERT INTO ag_resolution (id, title, resolution_text, required_majority, budget, budget_amount, id_ag_minutes, id_unit_group, id_ag_notice)
VALUES (
  'c3a7b1cb-bb95-4a1f-8592-90a8d3748c6e',
  'Mise en accessibilité de l’entrée',
  'Afin de se conformer aux règles d’accessibilité, il est proposé d’installer une rampe d’accès et d’élargir les portes. Coût estimé : 9 700 € TTC.',
  '25',
  true,
  6000,
  null,
  '8884093a-92c9-4347-a34d-0457a6a2d2bd',
  '3ae8b1cd-e2c2-4685-b1b0-f387de61b595'
);
INSERT INTO ag_resolution (id, title, resolution_text, required_majority, budget, budget_amount, id_ag_minutes, id_unit_group, id_ag_notice)
VALUES (
  'ff60c390-f4c1-4db3-87c2-cfc9e3e6b12f',
  'Suppression d’un arbre dangereux dans la cour',
  'Un arbre présente un risque de chute. Le devis pour son abattage est de 1 500 € TTC. Le vote porte sur cette intervention urgente.',
  '24',
  true,
  1500,
  null,
  '8884093a-92c9-4347-a34d-0457a6a2d2bc',
  '3ae8b1cd-e2c2-4685-b1b0-f387de61b596'
);

INSERT INTO ag_resolution (id, title, resolution_text, required_majority, budget, id_ag_minutes, id_unit_group, id_ag_notice)
VALUES (
  'e3535f79-1db3-4e45-bbb6-1663de1c1dc5',
  'règlement intérieur',
  'Le conseil syndical propose d’adopter un règlement intérieur visant à clarifier l’usage des parties communes, le tri des déchets et le respect du voisinage.',
  '24',
  false,
  null,
  '8884093a-92c9-4347-a34d-0457a6a2d2bc',
  '3ae8b1cd-e2c2-4685-b1b0-f387de61b597'
);
