/*
chat changement types 
Changer LOGICAL → BOOLEAN
Changer BYTE → TINYINT

pour avoir des created at remplit authomatiquement 
created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,

pour mettre l'option de special shares pour des groupes authomatiquement a false, sauf avis contraire
special_shares BOOLEAN NOT NULL DEFAULT false,


ag_resolution_budget - actif :  false by default
   actif BOOLEAN DEFAULT false,


charge_line - state : to be send by default
   state VARCHAR(20) NOT NULL DEFAULT 'to_be_sent',

chat : On Delete/Update Rules
You don’t define what should happen when a referenced record is deleted. Add ON DELETE CASCADE or SET NULL as appropriate.

chat: Indexes
You define UNIQUE constraints, which is good. Consider adding indexes on frequently queried foreign keys for performance.


voir si on cree tableau associtaif person - role ou si on rajoute le role sur la person, qui semble plus perttinent

*/

CREATE TABLE person(
   id VARCHAR(40),
   email VARCHAR(255) NOT NULL,
   password VARCHAR(60),
   first_name VARCHAR(100),
   last_name VARCHAR(100),
   street VARCHAR(255),
   postal_code VARCHAR(20),
   city VARCHAR(50),
   telephone VARCHAR(20),
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(id),
   UNIQUE(email)
);

CREATE TABLE role(
   id VARCHAR(40),
   name VARCHAR(50) NOT NULL,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(id),
   UNIQUE(name)
);

CREATE TABLE unit(
   id VARCHAR(40),
   name VARCHAR(50) NOT NULL,
   shares DECIMAL(6,2),
   description TEXT,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   id_person VARCHAR(40),
   PRIMARY KEY(id),
   FOREIGN KEY(id_person) REFERENCES person(id)
);

CREATE TABLE unit_group(
   id VARCHAR(40),
   name VARCHAR(50) NOT NULL,
   description VARCHAR(255),
   special_shares BOOLEAN NOT NULL DEFAULT false,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(id)
);

CREATE TABLE ag_notice(
   id VARCHAR(40),
   title VARCHAR(50) NOT NULL,
   place VARCHAR(255) NOT NULL,
   ag_date DATETIME NOT NULL,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(id),
   UNIQUE(title)
);

CREATE TABLE ag_minutes(
   id VARCHAR(40),
   minutes_date DATETIME NOT NULL,
   place VARCHAR(255) NOT NULL,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(id)
);

CREATE TABLE charge_call(
   id VARCHAR(40),
   charge_call_date DATE NOT NULL,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   id_person VARCHAR(40) NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_person) REFERENCES person(id)
);

CREATE TABLE charge_payment(
   id VARCHAR(40),
   amount DECIMAL(15,2) NOT NULL,
   charge_payment_date DATE NOT NULL,
   description VARCHAR(255),
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   id_charge_call VARCHAR(40) NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_charge_call) REFERENCES charge_call(id)
);

CREATE TABLE document_category(
   id VARCHAR(40),
   name VARCHAR(50) NOT NULL,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(id),
   UNIQUE(name)
);

CREATE TABLE budget_category(
   id VARCHAR(40),
   name VARCHAR(50) NOT NULL,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(id),
   UNIQUE(name)
);

CREATE TABLE call_dates(
   id CHAR(40),
   date_call DATE NOT NULL,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(id)
);

CREATE TABLE ag_resolution(
   id VARCHAR(40),
   title VARCHAR(50) NOT NULL,
   description TEXT NOT NULL,
   required_majority VARCHAR(20) NOT NULL,
   budget BOOLEAN NOT NULL,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   id_ag_minutes VARCHAR(40) NOT NULL,
   id_unit_group VARCHAR(40) NOT NULL,
   id_ag_notice VARCHAR(40) NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_ag_minutes) REFERENCES ag_minutes(id),
   FOREIGN KEY(id_unit_group) REFERENCES unit_group(id),
   FOREIGN KEY(id_ag_notice) REFERENCES ag_notice(id)
);

CREATE TABLE document(
   id VARCHAR(40),
   name VARCHAR(50) NOT NULL,
   description TEXT,
   url VARCHAR(255) NOT NULL,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   id_document_category VARCHAR(40) NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_document_category) REFERENCES document_category(id)
);

CREATE TABLE ag_resolution_budget(
   id VARCHAR(40),
   budget_amount DECIMAL(15,2) NOT NULL,
   budget_type VARCHAR(10) NOT NULL,
   operating_budget_start DATE,
   operating_budget_end DATE,
   nb_of_instalments TINYINT,
   budget_recup_tenant BOOLEAN,
   actif BOOLEAN DEFAULT false,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   id_budget_category VARCHAR(40) NOT NULL,
   id_ag_resolution VARCHAR(40) NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(id_ag_resolution),
   FOREIGN KEY(id_budget_category) REFERENCES budget_category(id),
   FOREIGN KEY(id_ag_resolution) REFERENCES ag_resolution(id)
);

CREATE TABLE invoice(
   id VARCHAR(40),
   amount DECIMAL(15,2) NOT NULL,
   invoice_date DATE NOT NULL,
   description VARCHAR(255),
   state VARCHAR(20) NOT NULL,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   id_ag_resolution_budget VARCHAR(40) NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_ag_resolution_budget) REFERENCES ag_resolution_budget(id)
);

CREATE TABLE invoice_payment(
   id VARCHAR(40),
   amount DECIMAL(15,2) NOT NULL,
   invoice_payment_date DATE NOT NULL,
   description VARCHAR(255),
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   id_invoice VARCHAR(40) NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_invoice) REFERENCES invoice(id)
);

CREATE TABLE charge_line(
   id VARCHAR(40),
   amount DECIMAL(15,2) NOT NULL,
   call_date DATE NOT NULL,
   state VARCHAR(20) NOT NULL DEFAULT 'to_be_sent',
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   id_unit VARCHAR(40) NOT NULL,
   id_charge_call VARCHAR(40),
   id_ag_resolution_budget VARCHAR(40) NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_unit) REFERENCES unit(id),
   FOREIGN KEY(id_charge_call) REFERENCES charge_call(id),
   FOREIGN KEY(id_ag_resolution_budget) REFERENCES ag_resolution_budget(id)
);

CREATE TABLE person_role(
   id_person VARCHAR(40),
   id_role VARCHAR(40),
   PRIMARY KEY(id_person, id_role),
   FOREIGN KEY(id_person) REFERENCES person(id),
   FOREIGN KEY(id_role) REFERENCES role(id)
);

CREATE TABLE unit_unit_group(
   id_unit VARCHAR(40),
   id_unit_group VARCHAR(40),
   adjusted_shares DECIMAL(6,2),
   PRIMARY KEY(id_unit, id_unit_group),
   FOREIGN KEY(id_unit) REFERENCES unit(id),
   FOREIGN KEY(id_unit_group) REFERENCES unit_group(id)
);

CREATE TABLE ag_notice_sent_person(
   id_person VARCHAR(40),
   id_ag_notice VARCHAR(40),
   PRIMARY KEY(id_person, id_ag_notice),
   FOREIGN KEY(id_person) REFERENCES person(id),
   FOREIGN KEY(id_ag_notice) REFERENCES ag_notice(id)
);

CREATE TABLE ag_notice_presence_person(
   id_person VARCHAR(40),
   id_ag_notice VARCHAR(40),
   presence VARCHAR(20) NOT NULL,
   represented_by VARCHAR(50),
   PRIMARY KEY(id_person, id_ag_notice),
   FOREIGN KEY(id_person) REFERENCES person(id),
   FOREIGN KEY(id_ag_notice) REFERENCES ag_notice(id)
);

CREATE TABLE ag_resolution_budget_call_dates(
   id_ag_resolution_budget VARCHAR(40),
   id_call_dates CHAR(40),
   PRIMARY KEY(id_ag_resolution_budget, id_call_dates),
   FOREIGN KEY(id_ag_resolution_budget) REFERENCES ag_resolution_budget(id),
   FOREIGN KEY(id_call_dates) REFERENCES call_dates(id)
);

CREATE TABLE ag_resolution_person(
   id_person VARCHAR(40),
   id_ag_resolution VARCHAR(40),
   vote VARCHAR(20) NOT NULL,
   PRIMARY KEY(id_person, id_ag_resolution),
   FOREIGN KEY(id_person) REFERENCES person(id),
   FOREIGN KEY(id_ag_resolution) REFERENCES ag_resolution(id)
);
