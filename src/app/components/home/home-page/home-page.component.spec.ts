import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withDisabledInitialNavigation } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '../../../interfaces/product.interface';
import { ProductService } from '../../../services/product.service';
import { HomePageComponent } from './home-page.component';

const PRODUCT_DATA_MOCK: Product[] = [
  {
    id: 1,
    title: 'Camiseta blanca',
    price: 19.99,
    description: 'Una camiseta cómoda',
    category: 'ropa',
    image: 'https://via.placeholder.com/150',
    rating: { rate: 4.3, count: 50 },
  },
  {
    id: 2,
    title: 'Zapatos deportivos',
    price: 49.99,
    description: 'Perfectos para correr',
    category: 'calzado',
    image: 'https://via.placeholder.com/150',
    rating: { rate: 4.8, count: 30 },
  },
];

class ProductServiceMock {
  getAll() {
    return of(PRODUCT_DATA_MOCK);
  }
}

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeAll(() => {
    registerLocaleData(localeEs);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [
        provideRouter([], withDisabledInitialNavigation()),
        { provide: ProductService, useClass: ProductServiceMock },
        { provide: LOCALE_ID, useValue: 'es-ES' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load products from ProductService on init', () => {
    expect(component.products.length).toBe(2);
    expect(component.filteredProducts.length).toBe(2);
  });

  it('should filter products by title on search', () => {
    component.onSearch('camiseta');
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].title).toBe('Camiseta blanca');

    component.onSearch('zapatos');
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].title).toBe('Zapatos deportivos');

    component.onSearch('inexistente');
    expect(component.filteredProducts.length).toBe(0);
  });
});
