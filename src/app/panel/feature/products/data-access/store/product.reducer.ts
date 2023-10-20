import { createReducer, on, createFeature, MemoizedSelector, createSelector, select } from '@ngrx/store';
// import { initialState, tableAdapter } from './product.state';
import { tableApiActions } from 'app/common/store/table/table.actions';
import { Product, createInitialProductTableState } from './product.state';
import { createTableAdapter } from 'app/common/store/table/table.state';

const { loadItems, loadItemsSuccess, loadItemsFailure, changePage } = tableApiActions<Product>();

export const productFeature = createFeature({
  name: 'products',
  reducer: createReducer(
    createInitialProductTableState(),
    on(loadItems, state => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }),
    on(loadItemsSuccess, (state, { data: products }) => {
      return createTableAdapter<Product>().setAll(products, { ...state, loading: false });
    }),
    on(loadItemsFailure, (state, { error }) => {
      return {
        ...state,
        loading: false,
        error,
      };
    }),
    on(changePage, (state, { page }) => {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: page,
        },
      };
    }),
  ),
  extraSelectors: ({ selectProductsState }) => ({
    ...createTableAdapter<Product>().getSelectors(selectProductsState),
  }),
});
