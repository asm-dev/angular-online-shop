import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
  ],
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.scss'],
})
export class BasketPageComponent {
  cartItems = [
    { name: 'Producto A', quantity: 1, price: 25 },
    { name: 'Producto B', quantity: 2, price: 15 },
  ];

  form = {
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    phone: '',
    accepted: false,
  };

  get total(): number {
    return this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  submit(): void {
    if (this.form.accepted) {
      console.log('Formulario enviado', this.form);
    } else {
      alert('Debe aceptar los términos antes de continuar.');
    }
  }
}
