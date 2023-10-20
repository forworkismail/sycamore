import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './store/product.state';
import { MOCK_PRODUCTS } from './mock-products';
import { GetAllOptions } from 'app/common/services/data-service.interface';
import { DataService } from 'app/common/services/data.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = MOCK_PRODUCTS;

  constructor(private dataService: DataService<Product>) {
    this.dataService.setBaseUrl('api/products'); // Assuming this is the URL to your product API
  }

  getAllProducts(options: GetAllOptions): Observable<Product[]> {
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

    // Paginate products based on the pagination options
    if (options.pagination) {
      const start = (options.pagination.currentPage - 1) * options.pagination.pageSize;
      const end = start + options.pagination.pageSize;
      result = result.slice(start, end);
    }

    return of(result);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.dataService.getById(id.toString());
  }

  addProduct(product: Product): Observable<Product> {
    return this.dataService.add(product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.dataService.update(product);
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.dataService.delete(id.toString());
  }

  deleteManyProducts(ids: Set<number>): Observable<boolean> {
    const stringIds = new Set<string>(Array.from(ids).map(String));
    return this.dataService.deleteMany(stringIds);
  }
}
