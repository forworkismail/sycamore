import { bootstrapApplication } from '@angular/platform-browser';
import { Routes, provideRouter, withRouterConfig } from '@angular/router';
import AppComponent from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'panel',
    pathMatch: 'full',
  },
  {
    path: 'panel',
    loadComponent: () => import('./app/panel/panel-shell.component'),
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      })
    ),
  ],
}).catch((err) => console.error(err));
