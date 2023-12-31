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
  label: string;
  width: number;
  type: 'text';
  mapper: (entity: T) => string;
  dependsOn: (keyof T)[];
  sortColumnBy: keyof T;
  tailwindClass?: (entity: T) => string;
  visible: boolean;
}

export interface Sort<T> {
  column: keyof T;
  direction: 'asc' | 'desc';
}

export type PageSize = 10 | 20 | 50;

export interface Pagination {
  currentPage: number;
  pageSize: PageSize;
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
