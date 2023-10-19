import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { productFeature } from './feature/products/data-access/store/product.reducer';
import { ProductEffects } from './feature/products/data-access/store/product.effects';

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
        path: 'products',
        loadComponent: () => import('./feature/products/products.component'),
        providers: [provideState(productFeature), provideEffects(ProductEffects)],
      },
      // {
      //   path: 'courses',
      //   loadComponent: () => import('./feature/courses/courses.component'),
      // },
    ],
  },
];
