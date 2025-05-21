import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { Product } from '../../../interfaces/product.interface';
import { ProductService } from '../../../services/product.service';
import { PageLayoutComponent } from '../../layout/page/page-layout.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, PageLayoutComponent, ProductCardComponent],
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
