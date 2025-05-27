import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  provideRouter,
  Router,
  withDisabledInitialNavigation,
} from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CartActions } from '../../../store/actions/cart.actions';
import { CartItem } from '../../../store/reducers/cart.reducer';
import {
  selectCartItems,
  selectCartTotal,
} from '../../../store/selectors/cart.selectors';
import { BasketPageComponent } from './basket-page.component';

const CART_ITEMS_MOCK: CartItem[] = [
  {
    product: {
      id: 1,
      title: 'Producto 1',
      price: 25,
      description: '',
      category: '',
      image: 'https://via.placeholder.com/150',
      rating: { rate: 4, count: 20 },
    },
    quantity: 2,
  },
];

const TOTAL_MOCK = 50;

describe('BasketPageComponent', () => {
  let component: BasketPageComponent;
  let fixture: ComponentFixture<BasketPageComponent>;
  let store: MockStore;
  let router: Router;

  beforeAll(() => {
    registerLocaleData(localeEs);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketPageComponent],
      providers: [
        provideRouter([], withDisabledInitialNavigation()),
        provideMockStore({
          selectors: [
            { selector: selectCartItems, value: CART_ITEMS_MOCK },
            { selector: selectCartTotal, value: TOTAL_MOCK },
          ],
        }),
        provideRouter([], withDisabledInitialNavigation()),
        { provide: LOCALE_ID, useValue: 'es-ES' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BasketPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch removeItem when remove() is called', () => {
    spyOn(store, 'dispatch');
    component.remove(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      CartActions.removeItem({ productId: 1 })
    );
  });

  it('should navigate to checkout if terms accepted', () => {
    component.form.accepted = true;
    component.submit();
    expect(router.navigate).toHaveBeenCalledWith(['/basket/checkout']);
  });

  it('should alert if terms not accepted', () => {
    spyOn(window, 'alert');
    component.form.accepted = false;
    component.submit();
    expect(window.alert).toHaveBeenCalledWith(
      'Debe aceptar los términos antes de continuar.'
    );
  });

  it('should expose cartItems$ and total$', fakeAsync(() => {
    let items: CartItem[] = [];
    let total = 0;

    component.cartItems$.subscribe((val) => (items = val));
    component.total$.subscribe((val) => (total = val));

    tick();
    expect(items).toEqual(CART_ITEMS_MOCK);
    expect(total).toBe(TOTAL_MOCK);
  }));
});
