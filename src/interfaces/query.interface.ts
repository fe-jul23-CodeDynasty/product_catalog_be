export interface IQuery {
  sortBy?: string;
  itemsOnPage?: string;
  currentPage?: string;
  direction?: 'ASC' | 'DESC';
  category?: Category;
}

export type Category = 'accessories' | 'tablets' | 'phones';
