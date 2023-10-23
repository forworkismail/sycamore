import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sort, Filters, Pagination } from './table.state';

export interface GetAllOptions<T> {
  sort: Sort<T>;
  filters: Filters;
  pagination: Pagination;
  fields: (keyof T)[];
}

export interface PaginatedResult<T> {
  data: T[];
  totalPages: number;
}

export interface TableServiceInterface<T> {
  getById(id: string): Observable<T | undefined>;
  getAll(options: GetAllOptions<T>): Observable<PaginatedResult<T>>;
  add(item: T): Observable<T>;
  setBaseUrl(url: string): void;
  update(item: T): Observable<T>;
  delete(id: string): Observable<boolean>;
  deleteMany(ids: Set<string>): Observable<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class TableService<T> implements TableServiceInterface<T> {
  private baseUrl: string = '';

  constructor(private http: HttpClient) {}

  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  getById(id: string): Observable<T | undefined> {
    return this.http.get<T | undefined>(`${this.baseUrl}/${id}`);
  }

  getAll(options: GetAllOptions<T>): Observable<PaginatedResult<T>> {
    return this.http.get<PaginatedResult<T>>(this.baseUrl, { params: this.createHttpParams(options) });
  }

  add(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, item);
  }

  update(item: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${(item as any).id}`, item);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }

  deleteMany(ids: Set<string>): Observable<boolean> {
    const idsArray = Array.from(ids);
    return this.http.request<boolean>('delete', this.baseUrl, { body: { ids: idsArray } });
  }

  private createHttpParams(options: GetAllOptions<T>): any {
    let params: any = {};
    if (options.pagination) {
      params.currentPage = options.pagination.currentPage.toString();
      params.pageSize = options.pagination.pageSize.toString();
    }
    if (options.sort) {
      params.sortColumn = options.sort.column;
      params.sortDirection = options.sort.direction;
    }
    // if (options.filter) {
    //   params.searchTerm = options.filter.searchTerm;
    //   if (options.filtering.category) {
    //     params.category = options.filtering.category;
    //   }
    // }
    return params;
  }
}
