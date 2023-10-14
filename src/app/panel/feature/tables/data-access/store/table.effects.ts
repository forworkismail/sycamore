import { Injectable, inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { TableService } from '../table.service';
import { tablePageActions, tableApiActions } from './table.actions';

const { loadTable } = tablePageActions;
const { tableLoadedSuccess, tableLoadedFailure } = tableApiActions;

@Injectable()
export class TableEffects {
  loadTables$ = createEffect(
    (actions$ = inject(Actions), tableService = inject(TableService)) => {
      return actions$.pipe(
        ofType(loadTable),
        mergeMap(() =>
          tableService.getAllProducts().pipe(
            map(products => tableLoadedSuccess({ products })),
            catchError(error => of(tableLoadedFailure({ error: error.message }))),
          ),
        ),
      );
    },
    { functional: true },
  );
}
