import { Routes } from '@angular/router';
import { authGuard } from '../../guards/auth.guard';
import { BasketPageComponent } from './basket-page/basket-page.component';

export const routes: Routes = [
  {
    path: '',
    component: BasketPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./checkout/payment.component').then((m) => m.PaymentComponent),
    canActivate: [authGuard],
  },
  {
    path: 'confirmation',
    loadComponent: () =>
      import('./confirmation/confirmation.component').then(
        (m) => m.ConfirmationComponent
      ),
    canActivate: [authGuard],
  },
];
