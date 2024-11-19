import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { TaskDetailsComponent } from './dasboard/member-dashboard/task-details/task-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./dasboard/admin-dashboard/admin-dashboard.component').then(
        (m) => m.AdminDashboardComponent
      ),
    canActivate: [authGuard],
    data: {
      role: 'admin',
    },
  },
  {
    path: 'admin/add',
    loadComponent: () =>
      import(
        './dasboard/admin-dashboard/task/add-task/add-task.component'
      ).then((m) => m.AddTaskComponent),
    canActivate: [authGuard],
    data: {
      role: 'admin',
    },
  },
  {
    path: 'admin/task/:id',
    loadComponent: () =>
      import(
        './dasboard/admin-dashboard/task/view-task/view-task.component'
      ).then((m) => m.ViewTaskComponent),
    canActivate: [authGuard],
    data: {
      role: 'admin',
    },
  },
  {
    path: 'admin/edit/:id',
    loadComponent: () =>
      import(
        './dasboard/admin-dashboard/task/edit-task/edit-task.component'
      ).then((m) => m.EditTaskComponent),
    canActivate: [authGuard],
    data: {
      role: 'admin',
    },
  },
  {
    path: 'admin/manage-users',
    loadComponent: () =>
      import(
        './dasboard/admin-dashboard/manage-users/manage-users.component'
      ).then((m) => m.ManageUsersComponent),
    canActivate: [authGuard],
    data: {
      role: 'admin',
    },
  },
  {
    path: 'member',
    loadComponent: () =>
      import('./dasboard/member-dashboard/member-dashboard.component').then(
        (m) => m.MemberDashboardComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'member/task/:id',
    component: TaskDetailsComponent,
    canActivate: [authGuard],
  },
];
