import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from '../../../interfaces/product.interface';
import { ProductService } from '../../../services/product.service';
import { CartActions } from '../../../store/actions/cart.actions';
import { PageLayoutComponent } from '../../layout/page/page-layout.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    PageLayoutComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  quantity = 1;

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private store = inject(Store);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getById(id).subscribe({
      next: (data) => (this.product = data),
      error: () => console.error('Error al cargar el producto'),
    });
  }

  addToCart(): void {
    if (!this.product) return;

    this.store.dispatch(
      CartActions.addItem({
        product: this.product,
        quantity: this.quantity,
      })
    );
  }
}
