import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AppComponent } from './app.component';
import { authGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
  },

  {
    path: 'login',
    component: LoginComponent,
  },
];
