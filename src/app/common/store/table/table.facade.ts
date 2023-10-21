import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map, take } from 'rxjs';
import { tableApiActions } from 'app/common/store/table/table.actions';
import {
  Filters,
  Pagination,
  Select,
  Sort,
  TableColumn,
  TableState,
  createInitialTableState,
} from 'app/common/store/table/table.state';
import { tableFeature } from 'app/common/store/table/table.reducer';
import { GetAllOptions } from './table.service';

@Injectable({ providedIn: 'root' })
export class TableFacade<T> {
  private readonly store: Store = inject(Store);
  private tableState = tableFeature<T>(createInitialTableState<T>());

  setInitialState(state: TableState<T>) {
    this.tableState = tableFeature<T>(state);
  }

  allItems$: Observable<T[]> = this.store.select(this.tableState.selectAll);
  columns$: Observable<TableColumn<T>[]> = this.store.select(this.tableState.selectColumns);
  pagination$: Observable<Pagination> = this.store.select(this.tableState.selectPagination);
  sort$: Observable<Sort<T>> = this.store.select(this.tableState.selectSort);
  filters$: Observable<Filters> = this.store.select(this.tableState.selectFilters);
  options$: Observable<GetAllOptions<T>> = combineLatest([this.pagination$, this.sort$, this.filters$]).pipe(
    map(([pagination, sort, filters]) => ({ pagination, sort, filters: filters })),
  );
  selection$: Observable<Select> = this.store.select(this.tableState.selectSelection);
  loading$: Observable<boolean> = this.store.select(this.tableState.selectLoading);

  loadItems() {
    this.options$
      .pipe(
        take(1), // We only need the latest emitted value
      )
      .subscribe(options => {
        this.store.dispatch(tableApiActions<T>().loadItems({ options }));
      });
  }

  changePage(page: number): void {
    this.store.dispatch(tableApiActions().changePage({ page }));
    this.toggleSelectAll(false);
    this.loadItems();
  }

  changeSort(sort: Sort<T>): void {
    this.store.dispatch(tableApiActions<T>().changeSort({ sort }));
    this.toggleSelectAll(false);
    this.changePage(1);
    this.loadItems();
  }

  toggleSelect(id: number) {
    this.store.dispatch(tableApiActions<T>().selectItem({ id }));
  }

  toggleSelectAll(selected: boolean) {
    this.store.dispatch(tableApiActions<T>().selectAllItems({ selected }));
  }
}
