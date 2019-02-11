export interface Attachment {
  id: any;
  language: string;
  due_date: Date;
  priority: string;
  name: string;
  link: string;
  mention?: string;
  status: string;
  description: string;
  file_set?: Array<{file: string, file_name: string}>;
  issues_count?: number;
  review_path?: any;
  price?: string;
  paid?: boolean;
}
