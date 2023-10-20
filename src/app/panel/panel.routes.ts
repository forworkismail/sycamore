import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { tableFeature } from 'app/common/store/table/table.reducer';
import { Product, createInitialProductTableState } from './feature/products/data-access/store/product.state';
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
        providers: [
          provideState(tableFeature<Product>(createInitialProductTableState())),
          provideEffects(ProductEffects),
        ],
      },
    ],
  },
];
