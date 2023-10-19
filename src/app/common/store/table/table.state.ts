import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export interface TableState<T> extends EntityState<T> {
  columns: TableColumn<T>[];
  displayedColumnIds: string[];
  sorting: SortingState;
  pagination: PaginationState;
  filtering: FilteringState;
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

export interface SortingState {
  columnId: number;
  direction: 'asc' | 'desc';
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

export interface FilteringState {
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
        columnId: 1,
        direction: 'asc',
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
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
