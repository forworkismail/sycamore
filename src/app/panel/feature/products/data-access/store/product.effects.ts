import { Injectable, inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { TableService } from '../products.service';
import { tableApiActions } from 'app/common/store/table/table.actions';
import { Product } from './product.state';

const { loadItems, loadItemsSuccess, loadItemsFailure } = tableApiActions<Product>();

@Injectable()
export class ProductEffects {
  loadTables$ = createEffect(
    (actions$ = inject(Actions), tableService = inject(TableService)) => {
      return actions$.pipe(
        ofType(loadItems),
        mergeMap(() =>
          tableService.getAllProducts().pipe(
            map(products => loadItemsSuccess({ data: products })),
            catchError(error => of(loadItemsFailure({ error: error.message }))),
          ),
        ),
      );
    },
    { functional: true },
  );
}
