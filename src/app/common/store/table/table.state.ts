import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export interface TableState<T> extends EntityState<T> {
  columns: TableColumn<T>[];
  sort: Sort<T>;
  pagination: Pagination;
  filters: Filters;
  selection: Select;
  loading: boolean;
  error: string | null;
}

export interface TableColumn<T> {
  id: number;
  label: string;
  width: number;
  type: 'text';
  mapper: (entity: T) => string;
  sortColumnBy: keyof T;
  tailwindClass?: (entity: T) => string;
}

export interface Sort<T> {
  column: keyof T;
  direction: 'asc' | 'desc';
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

export interface Filters {
  [key: string]: any;
}

export interface Select {
  allSelected: boolean;
  selectedItems: number[];
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
        totalPages: 0,
      },
      filters: {
        searchTerm: '',
        category: '',
      },
      selection: {
        selectedItems: [],
        allSelected: false,
      },
      loading: false,
      error: null,
    }),
  };
}
