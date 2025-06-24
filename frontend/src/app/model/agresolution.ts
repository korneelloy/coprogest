export interface AgResolution {
  id: string;
  title: string;
  description: string;
  required_majority: string;
  budget: string;
  id_ag_minutes: string;
  id_unit_group: string;
  id_ag_notice: string;
  created_at: Date;
  updated_at: Date;
}

/** 

CREATE TABLE ag_resolution(
  id VARCHAR(36),
  title VARCHAR(50) NOT NULL,
  resolution_text TEXT NOT NULL,
  required_majority VARCHAR(20) NOT NULL,
  budget BOOLEAN NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  id_ag_minutes VARCHAR(36),
  id_unit_group VARCHAR(36) NOT NULL,
  id_ag_notice VARCHAR(36) NOT NULL,

  */