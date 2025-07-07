import { Unit } from "./unit";

export interface Person {
  id: string;
  email: string;
  id_role?: string;
  password?: string;
  first_name: string; 
  last_name: string;
  street?: string;
  postal_code?: string;
  city?: string;
  telephone?: string;
  created_at?: Date;
  updated_at?: Date;

  role_name?: string;

  unit_id?: string;
  unit_name?: string;
  unit_shares?: string;
  adjusted_shares?: string;
  unit_group_id?: string;
  unit_group_name?: string; 
  unit_group_special_shares?: string;

  units?: Unit[]; 
      
}
