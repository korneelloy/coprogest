

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

