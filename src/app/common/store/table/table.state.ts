import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export interface TableState<T> extends EntityState<T> {
  columns: TableColumn<T>[];
  displayedColumnIds: string[];
  sorting: SortState;
  pagination: PaginationState;
  filtering: FilterState;
  loading: boolean;
  error: string | null;
}

export interface TableColumn<T> {
  id: number;
  label: string;
  width?: number;
  type: 'text';
  mapper: (entity: T) => string;
}

export interface SortState {
  column: string;
  direction: 'asc' | 'desc';
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
}

export interface FilterState {
  searchTerm: string;
  category?: string;
}

export function createTableAdapter<T>(): EntityAdapter<T> {
  return createEntityAdapter<T>();
}

export function createInitialTableState<T>(): TableState<T> {
  return {
    ...createTableAdapter<T>().getInitialState({
      columns: [],
      displayedColumnIds: [],
      sorting: {
        column: 'id',
        direction: 'asc',
      },
      pagination: {
        currentPage: 1,
        pageSize: 20,
      },
      filtering: {
        searchTerm: '',
        category: '',
      },
      loading: false,
      error: null,
    }),
  };
}
