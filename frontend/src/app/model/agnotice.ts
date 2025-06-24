import { Timestamp } from "rxjs";

export interface AgNotice {
  id: string;
  title: string;
  place: string;
  ag_date: Date;
  created_at: Date;
  updated_at: Date;
}
