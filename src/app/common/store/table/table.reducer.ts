import { createReducer, on, createFeature, MemoizedSelector, createSelector, select } from '@ngrx/store';
// import { initialState, tableAdapter } from './product.state';
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
      on(tableApiActions<T>().loadItemsSuccess, (state, { data }) => {
        return createTableAdapter<T>().setAll(data, { ...state, loading: false });
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
        const isItemSelected = state.selectedItems.includes(id);
        return {
          ...state,
          selectedItems: isItemSelected ? state.selectedItems.filter(i => i !== id) : [...state.selectedItems, id],
        };
      }),
      on(tableApiActions<T>().selectAllItems, (state, { selected }) => {
        return {
          ...state,
          selectedItems: selected ? [...(state.ids as number[])] : [],
        };
      }),
    ),
    extraSelectors: ({ selectTableState }) => ({
      ...createTableAdapter<T>().getSelectors(selectTableState),
    }),
  });
}
