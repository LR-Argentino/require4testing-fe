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
    {
      path: 'requirements',
      loadComponent: () => import('./requirements/requirements').then(m => m.Requirements),
      canActivate: [authGurad],
      children: [
        {
          path: 'new',
          loadComponent: () => import('./requirements/new-requirement/new-requirement').then(m => m.NewRequirement),
          data: {
            meta: {
              title: 'New Requirement',
              description: 'Create a new requirement'
            }
          }
        },

        {
          path: 'list',
          loadComponent: () => import('./requirements/requirement-list/requirement-list').then(m => m.RequirementList),
          data: {
            meta: {
              title: 'Requirement List',
              description: 'View all requirements'
            }
          },
        },
        {path: '', redirectTo: 'list', pathMatch: 'full'},
      ]
    },

    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  ]
;
