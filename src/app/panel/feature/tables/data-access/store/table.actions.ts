import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from './table.state';

export const tablePageActions = createActionGroup({
  source: 'Table Page',
  events: {
    loadTable: emptyProps(),
    selectItem: props<{ id: number }>(),
  },
});

export const tableApiActions = createActionGroup({
  source: 'Table API',
  events: {
    tableLoadedSuccess: props<{ products: Product[] }>(),
    tableLoadedFailure: props<{ error: string }>(),
  },
});
