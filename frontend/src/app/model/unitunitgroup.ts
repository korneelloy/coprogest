export interface UnitUnitGroup {
  id_unit: string;
  id_unit_group: string;
  adjusted_shares?: number; 
  
  unit_group_id?: string;
  unit_group_name?: string;
  unit_group_description?: string;
  unit_group_special_shares?: number;

  unit_id?: string;
  unit_name?: string;
  unit_shares?: number;
}
