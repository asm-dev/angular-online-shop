import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { PageLayoutComponent } from '../../layout/page/page-layout.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PageLayoutComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  cardNumber = '';
  expiry = '';
  cvc = '';
  loading = false;

  constructor(private router: Router) {}

  pay(): void {
    if (!this.cardNumber || !this.expiry || !this.cvc) {
      alert('Por favor, completa todos los campos');
      return;
    }

    this.loading = true;

    setTimeout(() => {
      this.loading = false;

      if (this.cardNumber === '4999999999999999') {
        this.router.navigate(['/basket/confirmation']);
      } else {
        alert(
          'Hay un error procesando la compra, revise los datos introducidos.'
        );
      }
    }, 3000);
  }
}
