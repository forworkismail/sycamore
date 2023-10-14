import { createReducer, on, createFeature, MemoizedSelector, createSelector } from '@ngrx/store';
import { tableApiActions, tablePageActions } from './table.actions';
import { initialState, tableAdapter } from './table.state';

const { loadTable } = tablePageActions;
const { tableLoadedSuccess, tableLoadedFailure } = tableApiActions;

export const tableFeature = createFeature({
  name: 'tables',
  reducer: createReducer(
    initialState,
    on(loadTable, state => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }),
    on(tableLoadedSuccess, (state, { products }) => {
      return tableAdapter.setAll(products, { ...state, loading: false });
    }),
    on(tableLoadedFailure, (state, { error }) => {
      return {
        ...state,
        loading: false,
        error,
      };
    }),
  ),
  extraSelectors: ({ selectTablesState }) => ({
    ...tableAdapter.getSelectors(selectTablesState),
  }),
});
