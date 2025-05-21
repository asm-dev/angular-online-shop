import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Product } from '../../../interfaces/product.interface';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { ProductService } from '../../../services/product.service';
import { PageLayoutComponent } from '../../layout/page/page-layout.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    RouterLink,
    PageLayoutComponent,
    MatCardModule,
    TruncatePipe,
  ],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  products: Product[] = [];
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => (this.products = data),
      error: () => console.error('Error al cargar productos'),
    });
  }
}
