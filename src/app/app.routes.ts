import {Routes} from '@angular/router';
import {authGurad} from './core/guards/auth-gurad';

export const routes: Routes = [
    {
      path: 'login',
      loadComponent: () => import('./login-form/login-form').then(m => m.LoginForm),
      data: {
        meta: {
          title: 'Login',
          description: 'Login to your account'
        }
      }
    },
    {
      path: 'dashboard',
      loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard),
      canActivate: [authGurad]
    },

    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  ]
;
