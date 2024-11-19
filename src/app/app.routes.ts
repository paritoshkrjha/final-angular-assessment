import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { AdminDashboardComponent } from './dasboard/admin-dashboard/admin-dashboard.component';
import { MemberDashboardComponent } from './dasboard/member-dashboard/member-dashboard.component';
import { AddTaskComponent } from './dasboard/admin-dashboard/task/add-task/add-task.component';
import { ManageUsersComponent } from './dasboard/admin-dashboard/manage-users/manage-users.component';
import { EditTaskComponent } from './dasboard/admin-dashboard/task/edit-task/edit-task.component';
import { ViewTaskComponent } from './dasboard/admin-dashboard/task/view-task/view-task.component';
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
    component: AdminDashboardComponent,
    canActivate: [authGuard],
    data: {
      role: 'admin',
    },
  },
  {
    path: 'admin/add',
    component: AddTaskComponent,
    canActivate: [authGuard],
    data: {
      role: 'admin',
    },
  },
  {
    path: 'admin/task/:id',
    component: ViewTaskComponent,
    canActivate: [authGuard],
    data: {
      role: 'admin',
    },
  },
  {
    path: 'admin/edit/:id',
    component: EditTaskComponent,
    canActivate: [authGuard],
    data: {
      role: 'admin',
    },
  },
  {
    path: 'admin/manage-users',
    component: ManageUsersComponent,
    canActivate: [authGuard],
    data: {
      role: 'admin',
    },
  },
  
];
