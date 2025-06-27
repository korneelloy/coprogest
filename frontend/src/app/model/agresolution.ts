export interface AgResolution {
  id: string;
  title: string;
  resolution_text: string;
  required_majority: string;
  budget: Number; //boolean
  id_ag_minutes: string;
  id_unit_group: string;
  id_ag_notice: string;
  created_at: Date;
  updated_at: Date;
  budget_amount: Number;
  budget_type: string;
  operating_budget_start: Date;
  operating_budget_end: Date;
  nb_of_instalments: Number;
  budget_recup_tenant: Number; //boolean
  budget_actif: Number; //boolean
  id_budget_category: string;
  budget_category_name?: string;
  call_date_date?: Date;
  call_date_id?: string
}
