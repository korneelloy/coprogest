export interface ChargeLine {
  id?: string;
  amount: number;
  call_date: Date;
  state?: string;
  created_at?: Date;
  updated_at?: Date;
  id_unit: string,
  id_ag_resolution: string,
  id_charge_call?: string
}



  /**

   * state -  enum {to be sent, send, remainder, paid} - not null - DEFAULT 'to_be_sent'
   * 
  */


