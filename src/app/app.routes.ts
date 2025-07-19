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
      }
    },
    {
      path: 'board',
      loadComponent: () => import('./kanban-board/kanban-board').then(m => m.KanbanBoard),
      data: {
        meta: {
          title: 'Kanban Board',
          description: 'Manage your tasks with the Kanban board'
        }
      }
    },
    {path: '', redirectTo: 'board', pathMatch: 'full'},
  ]
;
