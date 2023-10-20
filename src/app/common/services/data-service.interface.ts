import { Observable } from 'rxjs';

export interface Sort {
  column: string;
  direction: 'asc' | 'desc';
}

export interface Filter {
  [key: string]: any; // This can be a key-value pair where the key is the property to filter on and the value is the filter value. Adjust as needed.
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
}

export interface GetAllOptions {
  sort: Sort;
  filters: Filter;
  pagination: Pagination;
}

export interface DataServiceInterface<T> {
  getById(id: string): Observable<T | undefined>;
  getAll(options: GetAllOptions): Observable<T[]>;
  add(item: T): Observable<T>;
  setBaseUrl(url: string): void;
  update(item: T): Observable<T>;
  delete(id: string): Observable<boolean>;
  deleteMany(ids: Set<string>): Observable<boolean>;
}
