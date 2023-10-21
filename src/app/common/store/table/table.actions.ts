import { createActionGroup, props } from '@ngrx/store';
import { Sort } from './table.state';
import { GetAllOptions, PaginatedResult } from './table.service';

export function tableApiActions<T>() {
  return createActionGroup({
    source: 'Table API',
    events: {
      loadItems: props<{ options: GetAllOptions<T> }>(),
      loadItemsSuccess: props<{ data: T[]; totalPages: number }>(),
      loadItemsFailure: props<{ error: string }>(),
      changePage: props<{ page: number }>(),
      changeSort: props<{ sort: Sort<T> }>(),
      selectItem: props<{ id: number }>(),
      selectAllItems: props<{ selected: boolean }>(),
    },
  });
}
