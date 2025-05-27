import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {
  ActivatedRoute,
  provideRouter,
  withDisabledInitialNavigation,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Product } from '../../../interfaces/product.interface';
import { ProductService } from '../../../services/product.service';
import { CartActions } from '../../../store/actions/cart.actions';
import { ProductDetailsComponent } from './product-details.component';

const PRODUCT_DATA_MOCK: Product = {
  id: 1,
  title: 'Mock Product',
  price: 49.99,
  description: 'Descripción de prueba',
  category: 'mock-category',
  image: 'https://via.placeholder.com/150',
  rating: {
    rate: 4.5,
    count: 100,
  },
};

class ProductServiceMock {
  getById(id: number) {
    return of(PRODUCT_DATA_MOCK);
  }
}

const activatedRouteMock = {
  snapshot: {
    paramMap: {
      get: (key: string) => '1',
    },
  },
};

const storeMock = {
  dispatch: jasmine.createSpy('dispatch'),
};

describe('ProductDetailsComponent', () => {
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let component: ProductDetailsComponent;

  beforeAll(() => {
    registerLocaleData(es);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductDetailsComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatOptionModule,
      ],
      providers: [
        provideRouter([], withDisabledInitialNavigation()),
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: ProductService, useClass: ProductServiceMock },
        { provide: Store, useValue: storeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load product on init from ProductService', () => {
    expect(component.product).toEqual(PRODUCT_DATA_MOCK);
  });

  it('should dispatch addItem action when addToCart is called', () => {
    component.addToCart();
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      CartActions.addItem({
        product: PRODUCT_DATA_MOCK,
        quantity: 1,
      })
    );
  });
});
