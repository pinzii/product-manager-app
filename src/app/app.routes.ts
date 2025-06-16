import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () => import('./auth/pages/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
];
