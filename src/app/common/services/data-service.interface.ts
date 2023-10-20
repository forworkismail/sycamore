import { Observable } from 'rxjs';
import { Sort, Pagination, Filters } from '../store/table/table.state';

export interface GetAllOptions<T> {
  sort: Sort<T>;
  filters: Filters;
  pagination: Pagination;
}

export interface DataServiceInterface<T> {
  getById(id: string): Observable<T | undefined>;
  getAll(options: GetAllOptions<T>): Observable<T[]>;
  add(item: T): Observable<T>;
  setBaseUrl(url: string): void;
  update(item: T): Observable<T>;
  delete(id: string): Observable<boolean>;
  deleteMany(ids: Set<string>): Observable<boolean>;
}
