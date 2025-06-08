export interface Document {
  id: string;
  name: string;
  url: string;
  id_document_category: string;
  category_name?: string; 
  description: string;
  created_at: Date;
  updated_at: Date;
}
