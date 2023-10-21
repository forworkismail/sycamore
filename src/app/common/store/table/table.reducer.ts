import { createReducer, on, createFeature, MemoizedSelector, createSelector, select } from '@ngrx/store';
import { tableApiActions } from 'app/common/store/table/table.actions';
import { TableState, createTableAdapter } from 'app/common/store/table/table.state';

export function tableFeature<T>(initialState: TableState<T>) {
  return createFeature({
    name: 'table',
    reducer: createReducer(
      initialState,
      on(tableApiActions<T>().loadItems, state => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      }),
      on(tableApiActions<T>().loadItemsSuccess, (state, { data, totalPages }) => {
        return createTableAdapter<T>().setAll(data, {
          ...state,
          loading: false,
          pagination: { ...state.pagination, totalPages },
        });
      }),
      on(tableApiActions<T>().loadItemsFailure, (state, { error }) => {
        return {
          ...state,
          loading: false,
          error,
        };
      }),
      on(tableApiActions<T>().changePage, (state, { page }) => {
        return {
          ...state,
          pagination: {
            ...state.pagination,
            currentPage: page,
          },
        };
      }),
      on(tableApiActions<T>().changeSort, (state, { sort }) => {
        return {
          ...state,
          sort: {
            column: sort.column,
            direction: sort.direction,
          },
        };
      }),
      on(tableApiActions<T>().selectItem, (state, { id }) => {
        const isItemSelected = state.selection.selectedItems.includes(id);
        return {
          ...state,
          selectedItems: isItemSelected
            ? state.selection.selectedItems.filter(i => i !== id)
            : [...state.selection.selectedItems, id],
        };
      }),
      on(tableApiActions<T>().selectAllItems, (state, { selected }) => {
        return {
          ...state,
          selection: {
            selectedItems: selected ? [...(state.ids as number[])] : [],
            allSelected: selected ? true : false,
          },
        };
      }),
    ),
    extraSelectors: ({ selectTableState }) => ({
      ...createTableAdapter<T>().getSelectors(selectTableState),
    }),
  });
}
