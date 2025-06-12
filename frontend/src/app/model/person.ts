export interface Person {
  id: string;
  email: string;
  id_role: string;
  password: string;
  first_name: string; 
  last_name: string;
  street: string;
  postal_code: string;
  city: string;
  telephone: string;
  created_at: Date;
  updated_at: Date;
  role_name?: string;
}
