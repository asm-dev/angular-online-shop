import { Routes } from '@angular/router';
import { authGuard } from '../../guards/auth.guard';
import { BasketPageComponent } from './basket-page/basket-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

export const routes: Routes = [
  {
    path: '',
    component: BasketPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [authGuard],
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent,
    canActivate: [authGuard],
  },
];
