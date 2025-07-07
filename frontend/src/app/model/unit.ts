import { UnitGroup } from "./unitgroup";

export interface Unit {
  id: string;
  name: string;
  id_person: string;
  shares: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  owner_first_name?: string;
  owner_last_name?: string;
  owner_email?: string;
  selected?: boolean;

  unit_groups?: UnitGroup[];
}
