CREATE TABLE role(
   id VARCHAR(36),
   name VARCHAR(50) NOT NULL,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(id),
   UNIQUE(name)
);

CREATE TABLE unit_group(
   id VARCHAR(36),
   name VARCHAR(50) NOT NULL,
   description VARCHAR(255),
   special_shares BOOLEAN NOT NULL DEFAULT false,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(id)
);

CREATE TABLE ag_notice(
   id VARCHAR(36),
   title VARCHAR(50) NOT NULL,
   place VARCHAR(255) NOT NULL,
   ag_date DATETIME NOT NULL,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(id),
   UNIQUE(title, ag_date)
);

CREATE TABLE ag_minutes(
   id VARCHAR(36),
   minutes_date DATETIME NOT NULL,
   place VARCHAR(255) NOT NULL,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(id)
);


CREATE TABLE document_category(
   id VARCHAR(36),
   name VARCHAR(50) NOT NULL,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(id),
   UNIQUE(name)
);

CREATE TABLE budget_category(
   id VARCHAR(36),
   name VARCHAR(50) NOT NULL,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(id),
   UNIQUE(name)
);

CREATE TABLE call_date(
   id VARCHAR(36),
   date_call DATE NOT NULL,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   id_ag_resolution VARCHAR(36)  NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE person(
   id VARCHAR(36),
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
   id_role VARCHAR(36),
   PRIMARY KEY(id),
   UNIQUE(email),
   FOREIGN KEY (id_role) REFERENCES role(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE unit(
   id VARCHAR(36),
   name VARCHAR(50) NOT NULL,
   shares DECIMAL(6,2),
   description VARCHAR(255),
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   id_person VARCHAR(36) NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_person) REFERENCES person(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE ag_resolution(
   id VARCHAR(36),
   title VARCHAR(50) NOT NULL,
   resolution_text TEXT NOT NULL,
   required_majority VARCHAR(20) NOT NULL,
   budget BOOLEAN NOT NULL,
   budget_amount DECIMAL(15,2),
   budget_type VARCHAR(20),
   status VARCHAR(20),
   operating_budget_start DATE,
   operating_budget_end DATE,
   nb_of_instalments TINYINT,
   budget_recup_tenant BOOLEAN,
   budget_actif BOOLEAN DEFAULT false,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   id_budget_category VARCHAR(36),
   id_ag_minutes VARCHAR(36),
   id_unit_group VARCHAR(36) NOT NULL,
   id_ag_notice VARCHAR(36) NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_budget_category) REFERENCES budget_category(id) ON DELETE RESTRICT ON UPDATE CASCADE,
   FOREIGN KEY(id_ag_minutes) REFERENCES ag_minutes(id) ON DELETE RESTRICT ON UPDATE CASCADE,
   FOREIGN KEY(id_unit_group) REFERENCES unit_group(id) ON DELETE RESTRICT ON UPDATE CASCADE,
   FOREIGN KEY(id_ag_notice) REFERENCES ag_notice(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE document(
   id VARCHAR(36),
   name VARCHAR(50) NOT NULL,
   description VARCHAR(255),
   url VARCHAR(255) NOT NULL,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   id_document_category VARCHAR(36) NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_document_category) REFERENCES document_category(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE invoice(
   id VARCHAR(36),
   amount DECIMAL(15,2) NOT NULL,
   invoice_date DATE NOT NULL,
   description VARCHAR(255),
   state VARCHAR(20) NOT NULL,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   id_ag_resolution VARCHAR(36) NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_ag_resolution) REFERENCES ag_resolution(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE invoice_payment(
   id VARCHAR(36),
   amount DECIMAL(15,2) NOT NULL,
   invoice_payment_date DATE NOT NULL,
   description VARCHAR(255),
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   id_invoice VARCHAR(36) NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_invoice) REFERENCES invoice(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE charge_call(
   id VARCHAR(36),
   charge_call_date DATE NOT NULL,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   id_person VARCHAR(36) NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_person) REFERENCES person(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE charge_payment(
   id VARCHAR(36),
   amount DECIMAL(15,2) NOT NULL,
   charge_payment_date DATE NOT NULL,
   description VARCHAR(255),
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   id_charge_call VARCHAR(36) NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_charge_call) REFERENCES charge_call(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE charge_line(
   id VARCHAR(36),
   amount DECIMAL(15,2) NOT NULL,
   call_date DATE NOT NULL,
   state VARCHAR(20) NOT NULL DEFAULT 'to_be_sent',
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
   id_ag_resolution VARCHAR(36) NOT NULL,
   id_unit VARCHAR(36) NOT NULL,
   id_charge_call VARCHAR(36),
   PRIMARY KEY(id),
   FOREIGN KEY(id_ag_resolution) REFERENCES ag_resolution(id) ON DELETE RESTRICT ON UPDATE CASCADE,
   FOREIGN KEY(id_unit) REFERENCES unit(id) ON DELETE RESTRICT ON UPDATE CASCADE,
   FOREIGN KEY(id_charge_call) REFERENCES charge_call(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE unit_unit_group(
   id_unit VARCHAR(36) NOT NULL,
   id_unit_group VARCHAR(36) NOT NULL,
   adjusted_shares DECIMAL(6,2),
   PRIMARY KEY(id_unit, id_unit_group),
   FOREIGN KEY(id_unit) REFERENCES unit(id) ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY(id_unit_group) REFERENCES unit_group(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ag_notice_sent_person(
   id_person VARCHAR(36) NOT NULL,
   id_ag_notice VARCHAR(36) NOT NULL,
   PRIMARY KEY(id_person, id_ag_notice),
   FOREIGN KEY(id_person) REFERENCES person(id) ON DELETE RESTRICT ON UPDATE CASCADE,
   FOREIGN KEY(id_ag_notice) REFERENCES ag_notice(id) ON DELETE RESTRICT ON UPDATE CASCADE
);


CREATE TABLE ag_minutes_presence_person(
   id_person VARCHAR(36) NOT NULL,
   id_ag_minutes VARCHAR(36) NOT NULL,
   presence VARCHAR(20) NOT NULL,
   represented_by VARCHAR(50),
   PRIMARY KEY(id_person, id_ag_minutes),
   FOREIGN KEY(id_person) REFERENCES person(id) ON DELETE RESTRICT ON UPDATE CASCADE,
   FOREIGN KEY(id_ag_minutes) REFERENCES ag_minutes(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE ag_resolution_person(
   id_person VARCHAR(36) NOT NULL,
   id_ag_resolution VARCHAR(36) NOT NULL,
   vote VARCHAR(20) NOT NULL,
   PRIMARY KEY(id_person, id_ag_resolution),
   FOREIGN KEY(id_person) REFERENCES person(id) ON DELETE RESTRICT ON UPDATE CASCADE,
   FOREIGN KEY(id_ag_resolution) REFERENCES ag_resolution(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

INSERT INTO role (id, name) VALUES
('5041878f-2523-41d0-97b1-cd05bc60f1b8', 'coowner'),
('9663d291-1a31-40a0-b5b1-7f73140bd5cc', 'manager'),
('0641e7ea-d13d-46a3-86c2-6dcba6cd320c', 'assistant');