import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from './product.state';
import { productFeature } from './product.reducer';
import { TableColumn } from 'app/common/store/table/table.state';
import { tableApiActions } from 'app/common/store/table/table.actions';

@Injectable({ providedIn: 'root' })
export class ProductsFacade {
  private readonly store: Store = inject(Store);

  allProducts$: Observable<Product[]> = this.store.select(productFeature.selectAll);
  columns$: Observable<TableColumn<Product>[]> = this.store.select(productFeature.selectColumns);

  loadProducts(): void {
    this.store.dispatch(tableApiActions().loadItems());
  }
}
