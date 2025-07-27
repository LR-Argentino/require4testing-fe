// src/app/app.routes.ts
import {Routes} from '@angular/router';
import {authGurad} from '../core/guards/auth-gurad';

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
    path: '',
    loadComponent: () => import('./main-layout/main-layout').then(m => m.MainLayout),
    children: [
      // {
      //   path: 'dashboard',
      //   loadComponent: () => import('.').then(m => m.Dashboard),
      //   data: {
      //     meta: {
      //       title: 'Dashboard',
      //       description: 'Monitor your test management activities'
      //     }
      //   }
      // },
      {
        path: 'board',
        loadComponent: () => import('./kanban-board/kanban-board').then(m => m.KanbanBoard),
        data: {
          meta: {
            title: 'Kanban Board',
            description: 'Manage your tasks with the Kanban board'
          }
        },
        canActivate: [authGurad]
      },
      {
        path: 'test-cases',
        loadComponent: () => import('./test-cases/test-case-table/test-case-table').then(m => m.TestCaseTable),
        data: {
          meta: {
            title: 'Test Cases',
            description: 'Manage and organize your test cases'
          }
        },
        canActivate: [authGurad]
      },
      {
        path: 'test-runs',
        loadComponent: () => import('./test-runs/test-run-table/test-run-table').then(m => m.TestRunTable),
        data: {
          meta: {
            title: 'Test Runs',
            description: 'Execute and monitor test runs'
          }
        },
        canActivate: [authGurad]
      },
      {
        path: 'requirements',
        loadComponent: () => import('./requirements/requirement-table/requirement-table').then(m => m.RequirementTable),
        data: {
          meta: {
            title: 'Requirements',
            description: 'Manage project requirements'
          }
        },
        canActivate: [authGurad]
      },
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  }
];
