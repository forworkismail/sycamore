import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export interface TableState<T> extends EntityState<T> {
  columns: TableColumn<T>[];
  sort: Sort<T>;
  pagination: Pagination;
  filters: Filters;
  loading: boolean;
  error: string | null;
  selectedItems: number[];
}

export interface TableColumn<T> {
  id: number;
  label: string;
  width?: number;
  type: 'text';
  mapper: (entity: T) => string;
  sortColumnBy: keyof T;
}

export interface Sort<T> {
  column: keyof T;
  direction: 'asc' | 'desc';
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
}

export interface Filters {
  [key: string]: any;
}

export function createTableAdapter<T>(): EntityAdapter<T> {
  return createEntityAdapter<T>();
}

export function createInitialTableState<T>(): TableState<T> {
  return {
    ...createTableAdapter<T>().getInitialState({
      columns: [],
      sort: {
        column: {} as keyof T,
        direction: 'asc',
      },
      pagination: {
        currentPage: 1,
        pageSize: 20,
      },
      filters: {
        searchTerm: '',
        category: '',
      },
      loading: false,
      error: null,
      selectedItems: [],
    }),
  };
}
