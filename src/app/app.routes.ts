import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login-form/login-form').then(m => m.LoginForm),
    data: {
      meta: {
        title: 'Login',
        description: 'Login to your account'
      }
    },
    canActivate: [],
  }
];
