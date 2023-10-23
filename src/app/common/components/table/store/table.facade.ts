import { Injectable, Signal, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { tableApiActions } from 'app/common/components/table/store/table.actions';
import {
  Filters,
  PageSize,
  Pagination,
  Select,
  Sort,
  TableColumn,
  TableState,
  createInitialTableState,
} from 'app/common/components/table/store/table.state';
import { tableFeature } from 'app/common/components/table/store/table.reducer';
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
      fields: this.getDependsOnSet(this.columns()),
    };
  });

  getDependsOnSet(columns: TableColumn<T>[]): (keyof T)[] {
    const allDependsOn = columns.filter(column => column.visible).flatMap(column => column.dependsOn || []);
    return [...new Set(allDependsOn)];
  }

  loadItems(options: GetAllOptions<T>) {
    this.store.dispatch(
      tableApiActions<T>().loadItems({
        options,
      }),
    );
  }

  changePage(page: number): void {
    this.store.dispatch(tableApiActions().changePage({ currentPage: page }));
    this.toggleSelectAll(false);
    this.loadItems(this.options());
  }

  changePageSize(pageSize: PageSize): void {
    this.store.dispatch(tableApiActions().changePageSize({ pageSize }));
    this.toggleSelectAll(false);
    this.changePage(1);
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

  toggleColumnVisibility(column: TableColumn<T>) {
    this.store.dispatch(tableApiActions<T>().toggleColumnVisibility({ column }));
    this.loadItems(this.options());
  }
}
