import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../../interfaces/product.interface';
import { ProductService } from '../../../services/product.service';
import { PageLayoutComponent } from '../../layout/page/page-layout.component';
import { ProductCardComponent } from '../../product/product-card/product-card.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    SearchComponent,
    PageLayoutComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  private productService = inject(ProductService);

  products: Product[] = [];
  filteredProducts: Product[] = [];

  ngOnInit(): void {
    this.productService.getAll().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  onSearch(term: string): void {
    const lower = term.toLowerCase();
    this.filteredProducts = this.products.filter((p) =>
      p.title.toLowerCase().includes(lower)
    );
  }
}
