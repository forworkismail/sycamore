import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map, take } from 'rxjs';
import { Product } from './product.state';
import { productFeature } from './product.reducer';
import { tableApiActions } from 'app/common/store/table/table.actions';
import { GetAllOptions } from 'app/common/services/data-service.interface';
import { TableColumn, PaginationState, SortState, FilterState } from 'app/common/store/table/table.state';

@Injectable({ providedIn: 'root' })
export class ProductsFacade {
  private readonly store: Store = inject(Store);

  allProducts$: Observable<Product[]> = this.store.select(productFeature.selectAll);
  columns$: Observable<TableColumn<Product>[]> = this.store.select(productFeature.selectColumns);
  pagination$: Observable<PaginationState> = this.store.select(productFeature.selectPagination);
  sort$: Observable<SortState> = this.store.select(productFeature.selectSorting);
  filters$: Observable<FilterState> = this.store.select(productFeature.selectFiltering);

  options$: Observable<GetAllOptions> = combineLatest([this.pagination$, this.sort$, this.filters$]).pipe(
    map(([pagination, sort, filters]) => ({ pagination, sort, filters: filters })),
  );

  // loadProducts(): void {
  //   this.store.dispatch(tableApiActions().loadItems({ options: this.options$ }));
  // }

  loadProducts() {
    this.options$
      .pipe(
        take(1), // We only need the latest emitted value
      )
      .subscribe(options => {
        this.store.dispatch(tableApiActions().loadItems({ options }));
      });
  }

  changePage(page: number): void {
    this.store.dispatch(tableApiActions().changePage({ page }));
    this.loadProducts();
    console.log(this.store.select(productFeature.selectPagination).subscribe(pagination => console.log(pagination)));
  }
}
