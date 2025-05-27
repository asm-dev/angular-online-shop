import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { DebugElement, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, withDisabledInitialNavigation } from '@angular/router';
import { Product } from '../../../interfaces/product.interface';
import { ProductCardComponent } from './product-card.component';

const PRODUCT_DATA_MOCK: Product = {
  id: 1,
  title: 'Este es un producto muy largo que será truncado para la vista',
  price: 123.45,
  description: 'Lorem ipsum',
  category: 'mock',
  image: 'https://via.placeholder.com/150',
  rating: {
    rate: 4.3,
    count: 12,
  },
};

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate', standalone: false })
class TruncatePipeMock implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let debugEl: DebugElement;

  beforeAll(() => {
    registerLocaleData(localeEs);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      declarations: [TruncatePipeMock],
      providers: [
        provideRouter([], withDisabledInitialNavigation()),
        { provide: LOCALE_ID, useValue: 'es-ES' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;

    component.product = PRODUCT_DATA_MOCK;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render product title and price', () => {
    const title = debugEl.nativeElement.querySelector('h3').textContent;
    const price = debugEl.nativeElement.querySelector('p').textContent;

    expect(title).toContain(
      'Este es un producto muy largo que será truncado para la vist'
    );
    expect(price).toContain('123,45 €');
  });

  it('should set routerLink to product detail page', () => {
    const card = debugEl.query(By.css('.product-card'));
    expect(card.attributes['ng-reflect-router-link']).toBe(
      `/product,${PRODUCT_DATA_MOCK.id}`
    );
  });
});
