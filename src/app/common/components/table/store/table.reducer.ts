import { createReducer, on, createFeature, MemoizedSelector, createSelector, select } from '@ngrx/store';
import { tableApiActions } from 'app/common/components/table/store/table.actions';
import { TableState, createTableAdapter } from 'app/common/components/table/store/table.state';

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
      on(tableApiActions<T>().changePage, (state, { currentPage }) => {
        return {
          ...state,
          pagination: {
            ...state.pagination,
            currentPage,
          },
        };
      }),
      on(tableApiActions<T>().changePageSize, (state, { pageSize }) => {
        return {
          ...state,
          pagination: {
            ...state.pagination,
            pageSize,
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
          selection: {
            ...state.selection,
            selectedItems: isItemSelected
              ? state.selection.selectedItems.filter(i => i !== id)
              : [...state.selection.selectedItems, id],
          },
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
      on(tableApiActions<T>().toggleColumnVisibility, (state, { column }) => {
        return {
          ...state,
          columns: state.columns.map(c => {
            if (
              c.dependsOn.length === column.dependsOn.length &&
              c.dependsOn.every((value, index) => value === column.dependsOn[index])
            ) {
              return {
                ...c,
                visible: !c.visible,
              };
            }
            return c;
          }),
        };
      }),
    ),
    extraSelectors: ({ selectTableState }) => ({
      ...createTableAdapter<T>().getSelectors(selectTableState),
    }),
  });
}
