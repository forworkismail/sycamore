import { createActionGroup, props } from '@ngrx/store';
import { GetAllOptions } from 'app/common/services/data-service.interface';

export function tableApiActions<T>() {
  return createActionGroup({
    source: 'Table API',
    events: {
      changePage: props<{ page: number }>(),
      loadItems: props<{ options: GetAllOptions }>(),
      loadItemsSuccess: props<{ data: T[] }>(),
      loadItemsFailure: props<{ error: string }>(),
    },
  });
}
