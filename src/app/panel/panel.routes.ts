import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { tableFeature } from './feature/tables/data-access/store/table.reducer';
import { provideEffects } from '@ngrx/effects';
import { TableEffects } from './feature/tables/data-access/store/table.effects';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./panel.component'),
    children: [
      {
        path: 'colors',
        loadComponent: () => import('./feature/colors/colors.component'),
      },
      {
        path: 'tables',
        loadComponent: () => import('./feature/tables/tables.component'),
        providers: [provideState(tableFeature), provideEffects(TableEffects)],
      },
      // {
      //   path: 'courses',
      //   loadComponent: () => import('./feature/courses/courses.component'),
      // },
    ],
  },
];
