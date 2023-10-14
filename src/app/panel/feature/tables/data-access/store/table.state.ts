import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

export enum ProductType {
  ELECTRONICS = 'ELECTRONICS',
  CLOTHING = 'CLOTHING',
  FOOD = 'FOOD',
}

export interface TableColumn {
  id: string;
  title: string;
  name: string;
  type: string; // Types like 'text', 'number', 'image', 'link', etc.
}

export interface SortingState {
  columnId: string;
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

export interface TableState extends EntityState<Product> {
  selectedProductId: number | null;
  productType: ProductType;
  columns: TableColumn[];
  displayedColumnIds: string[];
  sorting: SortingState;
  pagination: PaginationState;
  filtering: FilteringState;
  loading: boolean;
  error: string | null;
}

export const tableAdapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: TableState = tableAdapter.getInitialState({
  selectedProductId: null,
  productType: ProductType.CLOTHING,
  columns: [],
  displayedColumnIds: [],
  sorting: {
    columnId: 'id',
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
});
