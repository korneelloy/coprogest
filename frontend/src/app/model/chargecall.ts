export interface ChargeCall {
  id?: string;
  charge_call_date: string;
  created_at?: Date;
  updated_at?: Date;
  id_person: string;
  total_charged?: number,
  total_paid?: number,
  amount_due?: number,
  person_email?: string,
  person_first_name?: string,
  person_last_name?: string,
  first_charge_line_state?: string,
  all_charge_line_states?: string[],
  total_amount?: number
}
