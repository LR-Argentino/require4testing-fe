import {Routes} from '@angular/router';

// TODO: Add Guard
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.Login)
  }
];
