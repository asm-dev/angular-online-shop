import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartActions } from '../../../store/actions/cart.actions';
import { CartItem } from '../../../store/reducers/cart.reducer';
import {
  selectCartItems,
  selectCartTotal,
} from '../../../store/selectors/cart.selectors';
import { PageLayoutComponent } from '../../layout/page/page-layout.component';

@Component({
  selector: 'app-basket-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PageLayoutComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    CurrencyPipe,
    MatIconModule,
  ],
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.scss'],
})
export class BasketPageComponent {
  private store = inject(Store);

  cartItems$: Observable<CartItem[]> = this.store.select(selectCartItems);
  total$: Observable<number> = this.store.select(selectCartTotal);

  form = {
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    phone: '',
    accepted: false,
  };

  constructor(private router: Router) {}

  remove(productId: number): void {
    this.store.dispatch(CartActions.removeItem({ productId }));
  }

  submit(): void {
    if (this.form.accepted) {
      this.router.navigate(['/basket/checkout']);
    } else {
      alert('Debe aceptar los términos antes de continuar.');
    }
  }
}
