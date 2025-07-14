export interface ChargeLine {
  id?: string;
  amount: number;
  call_date: Date;
  state?: string;
  created_at?: Date;
  updated_at?: Date;
  id_unit: string,
  id_ag_resolution: string,
  id_charge_call?: string,
  unit_id_person?: string,
  person_id?: string,
  person_email?: string,
  person_first_name?: string,
  person_last_name?: string,
  ag_resolution_title?: string,
  ag_minutes_date?: string,
  unit_name?: string,
  open_amount?: number,
  total_partial_paid?: number
}



  /**

   * state -  enum {to_be_sent, send, remainder, paid} - not null - DEFAULT 'to_be_sent'
   * 
  */


