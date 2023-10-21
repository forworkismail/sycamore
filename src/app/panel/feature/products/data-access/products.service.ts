import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './store/product.state';
import { MOCK_PRODUCTS } from './mock-products';
import { GetAllOptions, PaginatedResult, TableService } from 'app/common/store/table/table.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = MOCK_PRODUCTS;
  private readonly tableService = inject(TableService<Product>);

  constructor() {
    this.tableService.setBaseUrl('api/products');
  }

  getAllProducts(options: GetAllOptions<Product>): Observable<PaginatedResult<Product>> {
    let result = [...this.products]; // Create a shallow copy to avoid modifying the original array

    // Filter products based on the filter options
    if (options.filters) {
      if (options.filters['searchTerm']) {
        const term = options.filters['searchTerm'].toLowerCase();
        result = result.filter(product =>
          Object.values(product).some(val => val && val.toString().toLowerCase().includes(term)),
        );
      }
      if (options.filters['category']) {
        result = result.filter(product => product.category === options.filters['category']);
      }
    }

    if (options.sort) {
      result = result.sort((a, b) => {
        let valueA = a[options.sort.column];
        let valueB = b[options.sort.column];

        if (typeof valueA === 'string') {
          valueA = valueA.toLowerCase();
        }

        if (typeof valueB === 'string') {
          valueB = valueB.toLowerCase();
        }

        if (valueA < valueB) {
          return options.sort.direction === 'asc' ? -1 : 1;
        }

        if (valueA > valueB) {
          return options.sort.direction === 'asc' ? 1 : -1;
        }

        return 0; // if values are equal
      });
    }

    let totalPages = 1;

    // Paginate products based on the pagination options
    if (options.pagination) {
      totalPages = Math.ceil(result.length / options.pagination.pageSize);
      const start = (options.pagination.currentPage - 1) * options.pagination.pageSize;
      const end = start + options.pagination.pageSize;
      result = result.slice(start, end);
    }

    return of({ data: result, totalPages });
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.tableService.getById(id.toString());
  }

  addProduct(product: Product): Observable<Product> {
    return this.tableService.add(product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.tableService.update(product);
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.tableService.delete(id.toString());
  }

  deleteManyProducts(ids: Set<number>): Observable<boolean> {
    const stringIds = new Set<string>(Array.from(ids).map(String));
    return this.tableService.deleteMany(stringIds);
  }
}
