import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  provideRouter,
  Router,
  withDisabledInitialNavigation,
} from '@angular/router';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let component: RegisterComponent;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [provideRouter([], withDisabledInitialNavigation())],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form initially', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('should show required errors when fields are touched and empty', () => {
    component.firstName?.markAsTouched();
    component.lastName?.markAsTouched();
    component.email?.markAsTouched();
    component.password?.markAsTouched();
    fixture.detectChanges();

    const errors = fixture.debugElement.queryAll(By.css('mat-error'));
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should show email format error when invalid email is entered', () => {
    component.email?.setValue('invalid-email');
    component.email?.markAsTouched();
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('mat-error')).nativeElement;
    expect(error.textContent).toContain('Formato inválido');
  });

  it('should disable submit button if form is invalid', () => {
    const button = fixture.debugElement.query(
      By.css('button[type="submit"]')
    ).nativeElement;
    expect(button.disabled).toBeTrue();
  });

  it('should store user and navigate if form is valid', () => {
    spyOn(sessionStorage, 'setItem');
    spyOn(router, 'navigate');

    component.firstName?.setValue('Ana');
    component.lastName?.setValue('Pérez');
    component.email?.setValue('ana@example.com');
    component.password?.setValue('123456');
    fixture.detectChanges();

    component.onSubmit();

    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify({
        firstName: 'Ana',
        lastName: 'Pérez',
        email: 'ana@example.com',
        password: '123456',
      })
    );

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should NOT submit if form is invalid', () => {
    spyOn(sessionStorage, 'setItem');
    spyOn(router, 'navigate');

    component.firstName?.setValue('');
    component.lastName?.setValue('');
    component.email?.setValue('');
    component.password?.setValue('');
    fixture.detectChanges();

    component.onSubmit();

    expect(sessionStorage.setItem).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
