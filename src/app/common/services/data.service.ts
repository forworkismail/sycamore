import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataServiceInterface, GetAllOptions } from './data-service.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService<T> implements DataServiceInterface<T> {
  private baseUrl: string = '';

  constructor(private http: HttpClient) {}

  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  getById(id: string): Observable<T | undefined> {
    return this.http.get<T | undefined>(`${this.baseUrl}/${id}`);
  }

  getAll(options: GetAllOptions<T>): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl, { params: this.createHttpParams(options) });
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
