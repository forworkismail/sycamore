import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./panel.component'),
    children: [
      {
        path: 'colors',
        loadComponent: () => import('./feature/colors/colors.component'),
      },
    ],
  },
];
