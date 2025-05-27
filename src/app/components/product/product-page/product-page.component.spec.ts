import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withDisabledInitialNavigation } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '../../../interfaces/product.interface';
import { ProductService } from '../../../services/product.service';
import { ProductPageComponent } from './product-page.component';

const PRODUCT_DATA_MOCK: Product[] = [
  {
    id: 1,
    title: 'Mock Product 1',
    price: 19.99,
    description: 'Descripción del producto 1',
    category: 'electronics',
    image: 'https://via.placeholder.com/150',
    rating: {
      rate: 4.5,
      count: 120,
    },
  },
  {
    id: 2,
    title: 'Mock Product 2',
    price: 29.99,
    description: 'Descripción del producto 2',
    category: 'books',
    image: 'https://via.placeholder.com/150',
    rating: {
      rate: 3.8,
      count: 85,
    },
  },
];

class ProductServiceMock {
  getAll() {
    return of(PRODUCT_DATA_MOCK);
  }
}

describe('ProductPageComponent', () => {
  let fixture: ComponentFixture<ProductPageComponent>;
  let component: ProductPageComponent;

  beforeAll(() => {
    registerLocaleData(localeEs);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPageComponent],
      providers: [
        provideRouter([], withDisabledInitialNavigation()),
        { provide: ProductService, useClass: ProductServiceMock },
        { provide: LOCALE_ID, useValue: 'es-ES' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load products from the service', () => {
    expect(component.products.length).toBe(2);
    expect(component.products).toEqual(PRODUCT_DATA_MOCK);
  });
});
