// https://dbdiagram.io/d

Table role{
   id varchar [primary key]
   name varchar [not null]
   created_at timestamp
   updated_at timestamp
}

Table unit_group{
   id varchar [primary key]
   name varchar [not null]
   description varchar
   special_shares boolean [not null]
   created_at timestamp
   updated_at timestamp
}

Table ag_notice{
   id varchar [primary key]
   title varchar [not null]
   place varchar [not null]
   ag_date dateTIME [not null]
   created_at timestamp
   updated_at timestamp
}

Table ag_minutes{
   id varchar [primary key]
   minutes_date dateTIME [not null]
   place varchar [not null]
   created_at timestamp
   updated_at timestamp
}


Table document_category{
   id varchar [primary key]
   name varchar [not null]
   created_at timestamp
   updated_at timestamp
}

Table budget_category{
   id varchar [primary key]
   name varchar [not null]
   created_at timestamp
   updated_at timestamp
}

Table call_date{
   id varchar [primary key]
   date_call date [not null]
   created_at timestamp
   updated_at timestamp
   id_ag_resolution varchar  [not null]
}

Table person{
   id varchar [primary key]
   email varchar [not null]
   password varchar
   first_name varchar
   last_name varchar
   street varchar
   postal_code varchar
   city varchar
   telephone varchar
   created_at timestamp
   updated_at timestamp
   id_role varchar
   FOREIGN KEY (id_role) REFERENCES role(id) 
}

Table unit{
   id varchar [primary key]
   name varchar [not null]
   shares integer
   description varchar
   created_at timestamp
   updated_at timestamp
   id_person varchar [not null, ref: > person.id] // Foreign key
}

Table ag_resolution{
   id varchar [primary key]
   title varchar [not null]
   resolution_text TEXT [not null]
   required_majority varchar [not null]
   budget boolean [not null]
   budget_amount integer
   budget_type varchar
   operating_budget_start date
   operating_budget_end date
   nb_of_instalments TINYINT
   budget_recup_tenant boolean
   budget_actif boolean 
   created_at timestamp
   updated_at timestamp
   id_budget_category varchar
   id_ag_minutes varchar
   id_unit_group varchar [not null]
   id_ag_notice varchar [not null]
   FOREIGN KEY(id_budget_category) REFERENCES budget_category(id) 
   FOREIGN KEY(id_ag_minutes) REFERENCES ag_minutes(id)
   FOREIGN KEY(id_unit_group) REFERENCES unit_group(id)
   FOREIGN KEY(id_ag_notice) REFERENCES ag_notice(id)
}

Table document{
   id varchar [primary key]
   name varchar [not null]
   description varchar
   url varchar [not null]
   created_at timestamp
   updated_at timestamp
   id_document_category varchar [not null]
   FOREIGN KEY(id_document_category) REFERENCES document_category(id) 
}

Table invoice{
   id varchar [primary key]
   amount integer [not null]
   invoice_date date [not null]
   description varchar
   state varchar [not null]
   created_at timestamp
   updated_at timestamp
   id_ag_resolution varchar [not null]
   FOREIGN KEY(id_ag_resolution) REFERENCES ag_resolution(id) 
}

Table invoice_payment{
   id varchar [primary key]
   amount integer [not null]
   invoice_payment_date date [not null]
   description varchar
   created_at timestamp
   updated_at timestamp
   id_invoice varchar [not null]
   FOREIGN KEY(id_invoice) REFERENCES invoice(id) 
}

Table charge_call{
   id varchar [primary key]
   charge_call_date date [not null]
   created_at timestamp
   updated_at timestamp
   id_person varchar [not null]
   FOREIGN KEY(id_person) REFERENCES person(id) 
}

Table charge_payment{
   id varchar [primary key]
   amount integer [not null]
   charge_payment_date date [not null]
   description varchar
   created_at timestamp
   updated_at timestamp
   id_charge_call varchar [not null]
   FOREIGN KEY(id_charge_call) REFERENCES charge_call(id) 
}

Table charge_line{
   id varchar [primary key]
   amount integer [not null]
   call_date date [not null]
   state varchar [not null] 
   created_at timestamp
   updated_at timestamp
   id_ag_resolution varchar [not null]
   id_unit varchar [not null]
   id_charge_call varchar
   FOREIGN KEY(id_ag_resolution) REFERENCES ag_resolution(id) 
   FOREIGN KEY(id_unit) REFERENCES unit(id) 
   FOREIGN KEY(id_charge_call) REFERENCES charge_call(id) 
}

Table unit_unit_group{
   id_unit varchar [not null]
   id_unit_group varchar [not null]
   adjusted_shares integer
   FOREIGN KEY(id_unit) REFERENCES unit(id) 
   FOREIGN KEY(id_unit_group) REFERENCES unit_group(id) 
}

Table ag_notice_sent_person{
   id_person varchar [not null]
   id_ag_notice varchar [not null]
   FOREIGN KEY(id_person) REFERENCES person(id) 
   FOREIGN KEY(id_ag_notice) REFERENCES ag_notice(id) 
}

Table ag_notice_presence_person{
   id_person varchar [not null]
   id_ag_notice varchar [not null]
   presence varchar [not null]
   represented_by varchar
   FOREIGN KEY(id_person) REFERENCES person(id)
   FOREIGN KEY(id_ag_notice) REFERENCES ag_notice(id)
}

Table ag_resolution_person{
   id_person varchar [not null]
   id_ag_resolution varchar [not null]
   vote varchar [not null]
   FOREIGN KEY(id_person) REFERENCES person(id)
   FOREIGN KEY(id_ag_resolution) REFERENCES ag_resolution(id) 
}
