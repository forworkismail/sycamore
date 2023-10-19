import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Product } from './store/product.state';
import { MOCK_PRODUCTS } from './mock-products';

@Injectable({ providedIn: 'root' })
export class TableService {
  private products: Product[] = MOCK_PRODUCTS;

  constructor() {}

  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find(product => product.id === id);
    return of(product);
  }
}
