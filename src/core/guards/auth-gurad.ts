import {CanActivateFn, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication-service';
import {inject} from '@angular/core';

export const authGurad: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/login'], {
    queryParams: {
      returnUrl: state.url,
      message: 'login_required'
    }
  });
};
