import { createActionGroup, emptyProps, props } from '@ngrx/store';
// import { Product } from '../../../panel/feature/products/data-access/store/product.state';

// export const tablePageActions = createActionGroup({
//   source: 'Table Page',
//   events: {
//     loadTable: emptyProps(),
//     selectItem: props<{ id: number }>(),
//   },
// });

export function tableApiActions<T>() {
  return createActionGroup({
    source: 'Table API',
    events: {
      loadItems: emptyProps(),
      loadItemsSuccess: props<{ data: T[] }>(),
      loadItemsFailure: props<{ error: string }>(),
    },
  });
}
