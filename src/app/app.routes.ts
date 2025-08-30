import { Routes } from '@angular/router';
import { authGuard } from './auth/pages/auth.guard';

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
  {
  path: 'products',
  canActivate: [authGuard],
  loadChildren: () =>
    import('./products/products.module').then(m => m.ProductsModule)
  },

];
