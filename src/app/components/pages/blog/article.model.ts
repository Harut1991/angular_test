export interface Article {
  title: string;
  text: string;
  image: string;
  modified: Date;
  date: Date;
  tags: Array<{tag: string}>;
  id?: any;
  author?: string;
  description?: string;
  created?: Date;
  related_articles?: Array<Article>;
}
