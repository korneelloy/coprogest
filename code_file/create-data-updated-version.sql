INSERT INTO person (id, email, password, first_name, last_name, street, postal_code, city, telephone, id_role) VALUES
('38522c35-d231-49f7-9db3-83c9d7084fe1', 'kevin.martin@example.fr', 'Az#rty78!', 'Kevin', 'Martin', '12 rue de la République', '75001', 'Paris', '06 12 34 56 78', '9663d291-1a31-40a0-b5b1-7f73140bd5cc'),
('bc685517-2e92-4cad-8138-47af1db44f8b', 'johnny.dupont@orange.fr', 'F5%rGvLz9', 'Johnny', 'Dupont', '8 avenue des Champs', '69003', 'Lyon', '07 98 76 54 32', '0641e7ea-d13d-46a3-86c2-6dcba6cd320c'),
('2011ba64-274b-475e-938d-bf4f416d2e34', 'catherine.leroy@gmail.com', 'M!on3T&4x', 'Catherine', 'Leroy', '3 impasse Victor Hugo', '34000', 'Montpellier', '06 45 23 67 89', '0641e7ea-d13d-46a3-86c2-6dcba6cd320c'),
('666044ba-5e19-46d9-ad61-7e1987f6cdaa', 'julie.morel@laposte.net', 'R7)Jeu8$L', 'Julie', 'Morel', '56 boulevard Voltaire', '33000', 'Bordeaux', '07 11 22 33 44','5041878f-2523-41d0-97b1-cd05bc60f1b8'),
('0715c4b6-ebd7-4dbb-a695-57692207f985', 'monica.faure@protonmail.com', '#Zy8Urew1', 'Monica', 'Faure', '27 place de l’Église', '06000', 'Nice', '06 99 88 77 66', '5041878f-2523-41d0-97b1-cd05bc60f1b8'),
('c2411233-ad0a-43f1-8e2d-c9e7d003b237', 'samuel.durand@free.fr', 'Xp@ssw1Rd!', 'Samuel', 'Durand', '104 chemin du Moulin', '13090', 'Aix-en-Provence', '07 65 43 21 09', '5041878f-2523-41d0-97b1-cd05bc60f1b8'),
('b6994850-a1e2-4f87-ba5d-2b0b846834ed', 'daniel.leclerc@hotmail.fr', 'uS@9VgrFQx', 'Daniel', 'Leclerc', '17 allée des Tilleuls', '67000', 'Strasbourg', '06 78 12 98 34', '5041878f-2523-41d0-97b1-cd05bc60f1b8'),
('3dbdf433-96e2-4256-82df-09a3f241be44', 'jessica.perrin@wanadoo.fr', '+3Dc@2VnKo', 'Jessica', 'Perrin', '42 rue des Lilas', '31000', 'Toulouse', '06 01 23 45 67', '5041878f-2523-41d0-97b1-cd05bc60f1b8'),
('7a7fb120-372c-4ebb-9f77-604a56e778eb', 'michael.bernard@mayer.fr', 'Sn2S^qMo_1', 'Michael', 'Bernard', '95 quai de la Loire', '44000', 'Nantes', '07 84 21 56 33', '5041878f-2523-41d0-97b1-cd05bc60f1b8'),
('c6bdd364-85fb-4b7a-afc7-71ef424f30dc', 'kevin.romero@numericable.fr', 'KmVv3j2E!q', 'Kevin', 'Romero', '23 rue Jean Jaurès', '80000', 'Amiens', '06 73 59 48 20', '5041878f-2523-41d0-97b1-cd05bc60f1b8');

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


INSERT INTO unit_group (id, name, description, special_shares) VALUES
('8884093a-92c9-4347-a34d-0457a6a2d2bc', 'Tous les appartements', 'La totalité des lots', false),
('8884093a-92c9-4347-a34d-0457a6a2d2bd', 'Ascenseur', 'Les lots desservis par l’ascenseur', true),
('8884093a-92c9-4347-a34d-0457a6a2d2be', 'Escalier A', 'Les lots situés dans la cage A', false),
('8884093a-92c9-4347-a34d-0457a6a2d2bf', 'Escalier B', 'Les lots situés dans la cage B', false),
('8884093a-92c9-4347-a34d-0457a6a2d2c0', 'Parkings', 'Les lots de stationnement au sous-sol', false);


INSERT INTO ag_notice (id, title, place, ag_date) VALUES
('3ae8b1cd-e2c2-4685-b1b0-f387de61b588', 'AG janvier 2024', 'Chez M Martin, appartement 10', '2024-01-04 17:00:00'),
('3ae8b1cd-e2c2-4685-b1b0-f387de61b589', 'AG janvier 2023', 'Chez Mme Leroy, appartement 2', '2023-01-16 15:00:00');

INSERT INTO ag_minutes (id, minutes_date, place) VALUES
('da07f297-6f0a-41a8-9df7-d2cd3ed48983', '2024-01-04 17:00:00', 'Chez M Martin, appartement 10'),
('da07f297-6f0a-41a8-9df7-d2cd3ed48984', '2023-01-16 15:00:00', 'Chez M Leroy, appartement 2');


INSERT INTO charge_call (id, charge_call_date, id_person) VALUES
('f1d5301f-943f-4f70-a014-bc73401df1e5', '2025-02-04', '38522c35-d231-49f7-9db3-83c9d7084fe1'),
('f1d5301f-943f-4f70-a014-bc73401df1e6', '2025-02-04', '2011ba64-274b-475e-938d-bf4f416d2e34'),
('f1d5301f-943f-4f70-a014-bc73401df1e7', '2025-02-04', '7a7fb120-372c-4ebb-9f77-604a56e778eb'),
('f1d5301f-943f-4f70-a014-bc73401df1e8', '2025-02-04', 'c2411233-ad0a-43f1-8e2d-c9e7d003b237'),
('f1d5301f-943f-4f70-a014-bc73401df1e9', '2025-02-04', '666044ba-5e19-46d9-ad61-7e1987f6cdaa'),
('f1d5301f-943f-4f70-a014-bc73401df110', '2025-02-04', 'c2411233-ad0a-43f1-8e2d-c9e7d003b237'),
('f1d5301f-943f-4f70-a014-bc73401df111', '2025-02-04', 'b6994850-a1e2-4f87-ba5d-2b0b846834ed'),
('f1d5301f-943f-4f70-a014-bc73401df112', '2025-02-04', '0715c4b6-ebd7-4dbb-a695-57692207f985'),
('f1d5301f-943f-4f70-a014-bc73401df113', '2025-02-04', '7a7fb120-372c-4ebb-9f77-604a56e778eb'),
('f1d5301f-943f-4f70-a014-bc73401df114', '2025-02-04', 'c6bdd364-85fb-4b7a-afc7-71ef424f30dc');

INSERT INTO charge_payment (id, amount, charge_payment_date, description, id_charge_call) VALUES
('6eebf220-6715-42f5-8937-9d5e43b02f39', 920.89, '2025-04-16', 'payment reçu par cheque le 10/03/2025', 'f1d5301f-943f-4f70-a014-bc73401df1e5'),
('6eebf220-6715-42f5-8937-9d5e43b02f40', 850.00, '2025-04-17', 'virement bancaire reçu le 15/04/2025', 'f1d5301f-943f-4f70-a014-bc73401df1e6'),
('6eebf220-6715-42f5-8937-9d5e43b02f41', 780.55, '2025-04-19', 'paiement en espèces déposé à l’agence', 'f1d5301f-943f-4f70-a014-bc73401df1e7');


INSERT INTO document_category (id, name) VALUES
('274b6eb5-00ef-4a2e-a0a7-682c3e7d2103', 'General'),
('274b6eb5-00ef-4a2e-a0a7-682c3e7d2104', 'Compte rendu AG'),
('274b6eb5-00ef-4a2e-a0a7-682c3e7d2105', 'Factures'),
('274b6eb5-00ef-4a2e-a0a7-682c3e7d2106', 'Réglement de copropriété'),
('274b6eb5-00ef-4a2e-a0a7-682c3e7d2107', 'Rapports techniques'),
('274b6eb5-00ef-4a2e-a0a7-682c3e7d2108', 'Assurances');



INSERT INTO budget_category (id, name) VALUES
('41730a00-f81e-48d8-9b3a-4ae9fcb187eb', 'eau'),
('41730a00-f81e-48d8-9b3a-4ae9fcb187ec', 'electricité'),
('41730a00-f81e-48d8-9b3a-4ae9fcb187ed', 'entretien'),
('41730a00-f81e-48d8-9b3a-4ae9fcb187ee', 'nettoyage');


INSERT INTO call_dates (id, date_call) VALUES
('f7723c4f-9cfa-40b3-92cf-6aa0deec8815', '2025-04-10');

INSERT INTO ag_resolution (id, title, resolution_text, required_majority, budget, id_ag_minutes, id_unit_group, id_ag_notice) VALUES
('5d088a30-d1f4-4f8f-81e5-15cb4531ddc3', 'Réfection de la cage d escalier', 'Les copropriétaire descident de rénover la cage d escalier etc', '24', true, null, '8884093a-92c9-4347-a34d-0457a6a2d2bc', '3ae8b1cd-e2c2-4685-b1b0-f387de61b588');



-- Travaux ravalement façade
INSERT INTO ag_resolution (id, title, resolution_text, required_majority, budget, id_ag_minutes, id_unit_group, id_ag_notice)
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
  null,
  '8884093a-92c9-4347-a34d-0457a6a2d2bc',
  '3ae8b1cd-e2c2-4685-b1b0-f387de61b588'
);

-- Remplacement de l’interphone
INSERT INTO ag_resolution (id, title, resolution_text, required_majority, budget, id_ag_minutes, id_unit_group, id_ag_notice)
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
  null,
  '8884093a-92c9-4347-a34d-0457a6a2d2bc',
  '3ae8b1cd-e2c2-4685-b1b0-f387de61b588'
);

-- Installation d’un local à vélos
INSERT INTO ag_resolution (id, title, resolution_text, required_majority, budget, id_ag_minutes, id_unit_group, id_ag_notice)
VALUES (
  '15a7271a-4c90-4e56-a979-d55bbf1369f6',
  'Aménagement d’un local à vélos dans le sous-sol',
  'Face à la demande croissante des résidents, il est proposé de transformer une partie du local technique inutilisé au sous-sol en local sécurisé pour vélos. 
  Cette installation comprend des arceaux d’attache, un éclairage à détection de mouvement et un système de fermeture avec badge.
  Le budget prévisionnel est de 3 200 € TTC.
  Les copropriétaires devront se prononcer sur la création de ce local et l’affectation de cet espace commun à cet usage.
  Décision soumise à la majorité des voix exprimées des copropriétaires présents ou représentés (article 24).',
  '24',
  true,
  null,
  '8884093a-92c9-4347-a34d-0457a6a2d2bc',
  '3ae8b1cd-e2c2-4685-b1b0-f387de61b588'
);

-- Changement de syndic
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
  'da07f297-6f0a-41a8-9df7-d2cd3ed48983',
  '8884093a-92c9-4347-a34d-0457a6a2d2bc',
  '3ae8b1cd-e2c2-4685-b1b0-f387de61b588'
);



INSERT INTO ag_resolution_budget (id, budget_amount, budget_type, operating_budget_start, operating_budget_end, nb_of_instalments, budget_recup_tenant, actif, id_budget_category, id_ag_resolution) VALUES
('00e61fe4-97ae-4d93-bce1-b43548a76dd0', 3673.71, 'exceptional', null, null, 1, false, false, '41730a00-f81e-48d8-9b3a-4ae9fcb187eb', '5d088a30-d1f4-4f8f-81e5-15cb4531ddc3');
