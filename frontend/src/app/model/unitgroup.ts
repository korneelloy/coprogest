export interface UnitGroup {
adjusted_shares: any;
  id: string;
  name: string;
  description: string;
  special_shares?: boolean; 
  created_at: Date;
  updated_at: Date;
  selectedUnits?: [string, string];
}
