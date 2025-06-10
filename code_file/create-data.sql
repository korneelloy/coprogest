INSERT INTO person (id, email, password, first_name, last_name, street, postal_code, city, telephone, created_at, updated_at) VALUES
('38522c35-d231-49f7-9db3-83c9d7084fe1', 'john68@blevins.net', '#a@m5*Dzda', 'Kevin', 'Johnson', '702 Little Crest', '40229', 'Port Jeffreyberg', '607-759-0213x70453', '2024-05-11 21:44:46', NULL),
('bc685517-2e92-4cad-8138-47af1db44f8b', 'scottjohnson@spence-carr.com', 'FLn5M6UzB@', 'Johnny', 'Craig', '65104 Taylor Gardens Apt. 238', '31500', 'North Anthony', '+1-234-649-0920x63688', '2024-09-17 02:50:14', NULL),
('2011ba64-274b-475e-938d-bf4f416d2e34', 'kwright@johnson.com', 'c+OWm0Ht@3', 'Catherine', 'Mccarthy', '029 Robert Drives Suite 868', '12246', 'East Brian', '490.280.5525', '2024-06-01 10:54:55', NULL),
('666044ba-5e19-46d9-ad61-7e1987f6cdaa', 'jennifer75@myers.com', 'F7)W2JMa^l', 'Julie', 'Hall', '9749 Macias Crescent Apt. 230', '87523', 'South Jessicaton', '001-701-125-6645x20444', '2024-03-13 22:32:55', NULL),
('0715c4b6-ebd7-4dbb-a695-57692207f985', 'kevinjones@gmail.com', '#4YLtw7UB1', 'Monica', 'Waters', '6189 Nicholas Shores Apt. 040', '15186', 'Port Josephton', '5488530152', '2024-03-28 13:21:47', NULL),
('c2411233-ad0a-43f1-8e2d-c9e7d003b237', 'tiffanypeters@hale.org', 'X9)Kxw@#&A', 'Samuel', 'Jones', '528 Jason Run', '02591', 'Jackland', '7063483459', '2025-01-17 13:54:16', NULL),
('b6994850-a1e2-4f87-ba5d-2b0b846834ed', 'jacobewing@hotmail.com', 'us@9vGrfqX', 'Daniel', 'Santana', '3611 Kaylee Harbor Apt. 432', '68218', 'Webbborough', '419.301.2024x931', '2025-01-16 02:53:05', NULL),
('3dbdf433-96e2-4256-82df-09a3f241be44', 'christinagibbs@harvey.net', '+3D@C2VnKO', 'Jessica', 'Nicholson', '66089 Luis Pines Suite 536', '05439', 'Port Sandra', '001-720-673-2148x56576', '2025-03-23 10:37:24', NULL),
('7a7fb120-372c-4ebb-9f77-604a56e778eb', 'victoria25@mayer.com', 'sn2SQMo^_l', 'Michael', 'Jordan', '0352 Harris Ways Apt. 292', '27490', 'North Kelly', '001-509-620-7442x6698', '2024-11-07 11:54:07', NULL),
('c6bdd364-85fb-4b7a-afc7-71ef424f30dc', 'romerojustin@morris.org', 'KMVv3J2e!q', 'Kevin', 'Ferguson', '3827 Joshua Pine Suite 830', '46508', 'New Kennethport', '431-618-8916', '2025-05-26 21:02:20', NULL);

INSERT INTO role (id, name, created_at, updated_at) VALUES
('5041878f-2523-41d0-97b1-cd05bc60f1b8', 'coowner', '2023-10-21 01:02:21', NULL),
('9663d291-1a31-40a0-b5b1-7f73140bd5cc', 'manager', '2024-09-28 09:43:48', NULL),
('0641e7ea-d13d-46a3-86c2-6dcba6cd320c', 'assistant', '2024-04-12 19:33:57', NULL);

INSERT INTO unit (id, name, shares, description, created_at, updated_at, id_person) VALUES
('c12cb34b-6448-4059-91ad-6881d9bbd20c', 'Unit 69', 73.18, 'Identify single letter line art number.', '2023-06-10 23:49:19', NULL, '2011ba64-274b-475e-938d-bf4f416d2e34'),
('dbfd0774-0f81-4e6b-9015-cdec8a7d1ecd', 'Unit 60', 38.57, 'Ball we relate choose.', '2024-01-18 08:53:03', NULL, '7a7fb120-372c-4ebb-9f77-604a56e778eb'),
('c9f71085-845d-46c7-809d-3453b847fbbd', 'Unit 29', 68.78, 'But three situation meet.', '2025-01-07 21:47:29', NULL, '38522c35-d231-49f7-9db3-83c9d7084fe1'),
('7f86f914-d31c-496d-a4f5-f315af1b97b0', 'Unit 30', 82.36, 'Action view section instead.', '2023-12-02 07:05:58', NULL, 'c2411233-ad0a-43f1-8e2d-c9e7d003b237'),
('aceceac2-ae4c-4354-b08a-7720f203263d', 'Unit 52', 27.51, 'Evidence country right history officer.', '2025-04-05 15:41:59', NULL, '666044ba-5e19-46d9-ad61-7e1987f6cdaa'),
('ff756164-ed9f-42b2-9f94-0e081654803b', 'Unit 73', 87.76, 'Expert memory and and his ready.', '2024-11-07 14:02:59', NULL, 'c2411233-ad0a-43f1-8e2d-c9e7d003b237'),
('481a87e1-2f12-41d4-8ed5-edbfad94a8bb', 'Unit 28', 65.89, 'Behind glass group sit seven become.', '2024-01-06 04:47:03', NULL, 'b6994850-a1e2-4f87-ba5d-2b0b846834ed'),
('f1c436e9-e292-4b4c-92c3-134dbd87fb3c', 'Unit 83', 46.43, 'Tough watch look pattern.', '2024-09-07 13:09:41', NULL, '0715c4b6-ebd7-4dbb-a695-57692207f985'),
('241b21e4-cca7-43eb-b016-88ef27cd41c4', 'Unit 18', 25.42, 'Effort foot whose range soon.', '2024-11-04 11:17:06', NULL, '7a7fb120-372c-4ebb-9f77-604a56e778eb'),
('49e30d14-5a45-451e-9abc-e777aca94261', 'Unit 69', 27.01, 'Drug top science sort prepare result new.', '2024-04-30 17:46:29', NULL, 'c6bdd364-85fb-4b7a-afc7-71ef424f30dc');



INSERT INTO unit_group (id, name, description, special_shares, created_at, updated_at) VALUES
('8884093a-92c9-4347-a34d-0457a6a2d2bc', 'All', 'Author age social appear operation western billion.', false, '2025-05-30 00:00:00', NULL),
('8884093a-92c9-4347-a34d-0457a6a2d2bd', 'Ascenseur', 'Author age social appear operation western billion.', false, '2025-05-30 00:00:00', NULL);

INSERT INTO ag_notice (id, title, place, ag_date, created_at, updated_at) VALUES
('3ae8b1cd-e2c2-4685-b1b0-f387de61b588', 'Become assume future', '48793 Lopez Fall Suite 666\nPhillipsmouth, IN 87085', '2024-12-04 16:50:56', '2025-05-30 00:00:00', NULL);

INSERT INTO ag_minutes (id, minutes_date, place, created_at, updated_at) VALUES
('da07f297-6f0a-41a8-9df7-d2cd3ed48983', '2024-11-19 04:17:58', '3175 Linda Streets Apt. 587\nPort Kenneth, IN 25997', '2025-05-30 00:00:00', NULL);

INSERT INTO charge_call (id, charge_call_date, created_at, updated_at, id_person) VALUES
('f1d5301f-943f-4f70-a014-bc73401df1e5', '2025-02-04', '2025-05-30 00:00:00', NULL, 'e11cc765-8054-4637-a2d2-b4f20291f14a');

INSERT INTO charge_payment (id, amount, charge_payment_date, description, created_at, updated_at, id_charge_call) VALUES
('6eebf220-6715-42f5-8937-9d5e43b02f39', 920.89, '2025-04-16', 'Offer someone real hospital.', '2025-05-30 00:00:00', NULL, 'f1d5301f-943f-4f70-a014-bc73401df1e5');

INSERT INTO document_category (id, name, created_at, updated_at) VALUES
('274b6eb5-00ef-4a2e-a0a7-682c3e7d2103', 'General', '2025-05-30 00:00:00', NULL);

INSERT INTO budget_category (id, name, created_at, updated_at) VALUES
('41730a00-f81e-48d8-9b3a-4ae9fcb187eb', 'General Budget', '2025-05-30 00:00:00', NULL);

INSERT INTO call_dates (id, date_call, created_at, updated_at) VALUES
('f7723c4f-9cfa-40b3-92cf-6aa0deec8815', '2025-04-10', '2025-05-30 00:00:00', NULL);

INSERT INTO ag_resolution (id, title, description, required_majority, budget, created_at, updated_at, id_ag_minutes, id_unit_group, id_ag_notice) VALUES
('5d088a30-d1f4-4f8f-81e5-15cb4531ddc3', 'Bill region forget', 'Large view full rule account guess seat.', 'simple', false, '2025-05-30 00:00:00', NULL, 'da07f297-6f0a-41a8-9df7-d2cd3ed48983', '8884093a-92c9-4347-a34d-0457a6a2d2bc', '3ae8b1cd-e2c2-4685-b1b0-f387de61b588');

INSERT INTO ag_resolution_budget (id, budget_amount, budget_type, operating_budget_start, operating_budget_end, nb_of_instalments, budget_recup_tenant, actif, created_at, updated_at, id_budget_category, id_ag_resolution) VALUES
('00e61fe4-97ae-4d93-bce1-b43548a76dd0', 3673.71, 'operating', '2025-04-20', '2025-02-09', 3, true, true, '2025-05-30 00:00:00', NULL, '41730a00-f81e-48d8-9b3a-4ae9fcb187eb', '5d088a30-d1f4-4f8f-81e5-15cb4531ddc3');


