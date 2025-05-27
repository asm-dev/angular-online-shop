import { Component } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  provideRouter,
  Router,
  withDisabledInitialNavigation,
} from '@angular/router';
import { PaymentComponent } from './payment.component';

@Component({
  standalone: true,
  template: '',
})
class DummyComponent {}

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentComponent, FormsModule, DummyComponent],
      providers: [
        provideRouter(
          [{ path: 'basket/confirmation', component: DummyComponent }],
          withDisabledInitialNavigation()
        ),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the pay button when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(
      By.css('button.full-width')
    ).nativeElement;

    expect(button.disabled).toBeTrue();
  });

  it('should show alert if any field is empty on submit', () => {
    spyOn(window, 'alert');
    component.cardNumber = '';
    component.expiry = '';
    component.cvc = '';
    component.pay();
    expect(window.alert).toHaveBeenCalledWith(
      'Por favor, completa todos los campos'
    );
  });

  it('should navigate to confirmation if card number is correct', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    component.cardNumber = '4999999999999999';
    component.expiry = '12/25';
    component.cvc = '123';

    component.pay();
    expect(component.loading).toBeTrue();

    tick(3000);

    expect(component.loading).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/basket/confirmation']);
  }));

  it('should show alert if card number is invalid', fakeAsync(() => {
    spyOn(window, 'alert');
    component.cardNumber = '1234567890123456';
    component.expiry = '12/25';
    component.cvc = '123';

    component.pay();
    tick(3000);

    expect(window.alert).toHaveBeenCalledWith(
      'Hay un error procesando la compra, revise los datos introducidos.'
    );
  }));
});
