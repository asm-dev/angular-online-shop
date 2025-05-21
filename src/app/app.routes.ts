import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/home/home.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'basket',
    loadChildren: () =>
      import('./components/basket/basket.routes').then((m) => m.routes),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./components/product/product.routes').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
