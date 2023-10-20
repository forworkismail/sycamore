import { createActionGroup, props } from '@ngrx/store';
import { GetAllOptions } from 'app/common/services/data-service.interface';
import { Sort, TableColumn } from './table.state';

export function tableApiActions<T>() {
  return createActionGroup({
    source: 'Table API',
    events: {
      loadItems: props<{ options: GetAllOptions<T> }>(),
      loadItemsSuccess: props<{ data: T[] }>(),
      loadItemsFailure: props<{ error: string }>(),
      changePage: props<{ page: number }>(),
      changeSort: props<{ sort: Sort<T> }>(),
    },
  });
}
