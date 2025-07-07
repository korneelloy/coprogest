export interface UnitGroup {
  id: string;
  name: string;
  description: string;
  special_shares?: number; 
  created_at: Date;
  updated_at: Date;

  selectedUnits?: [string, string];

  adjusted_shares?: number;

  unit_id?: string;
  unit_name?: string; 
  unit_shares?: number;
  unit_id_person?: string;
}
