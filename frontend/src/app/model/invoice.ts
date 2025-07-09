export interface Invoice {
  id?: string;
  amount: number;
  invoice_date: Date;
  description?: string;
  state: string;
  created_at?: Date;
  updated_at?: Date;
  id_ag_resolution: string;
}
