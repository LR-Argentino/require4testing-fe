import {Routes} from '@angular/router';
import {authGuard} from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.Login)
  },
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];
