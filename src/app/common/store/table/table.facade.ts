import { Injectable, Signal, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
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

  allItems: Signal<T[]> = this.store.selectSignal(this.tableState.selectAll);
  columns: Signal<TableColumn<T>[]> = this.store.selectSignal(this.tableState.selectColumns);
  pagination: Signal<Pagination> = this.store.selectSignal(this.tableState.selectPagination);
  sort: Signal<Sort<T>> = this.store.selectSignal(this.tableState.selectSort);
  filters: Signal<Filters> = this.store.selectSignal(this.tableState.selectFilters);
  selection: Signal<Select> = this.store.selectSignal(this.tableState.selectSelection);
  loading: Signal<boolean> = this.store.selectSignal(this.tableState.selectLoading);
  options = computed<GetAllOptions<T>>(() => {
    return {
      pagination: this.pagination(),
      sort: this.sort(),
      filters: this.filters(),
    };
  });

  loadItems(options: GetAllOptions<T>) {
    this.store.dispatch(
      tableApiActions<T>().loadItems({
        options,
      }),
    );
  }

  changePage(page: number): void {
    this.store.dispatch(tableApiActions().changePage({ page }));
    this.toggleSelectAll(false);
    this.loadItems(this.options());
  }

  changeSort(sort: Sort<T>): void {
    this.store.dispatch(tableApiActions<T>().changeSort({ sort }));
    this.toggleSelectAll(false);
    this.changePage(1);
    this.loadItems(this.options());
  }

  toggleSelect(id: number) {
    this.store.dispatch(tableApiActions<T>().selectItem({ id }));
  }

  toggleSelectAll(selected: boolean) {
    this.store.dispatch(tableApiActions<T>().selectAllItems({ selected }));
  }
}
