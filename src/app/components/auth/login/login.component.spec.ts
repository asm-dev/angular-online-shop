import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  provideRouter,
  Router,
  withDisabledInitialNavigation,
} from '@angular/router';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [provideRouter([], withDisabledInitialNavigation())],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form initially', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('should disable submit button if form is invalid', () => {
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTrue();
  });

  it('should show email format error when email is invalid', () => {
    component.email?.setValue('not-an-email');
    component.email?.markAsTouched();
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('mat-error');
    expect(error?.textContent).toContain('Formato inválido');
  });

  it('should NOT submit if form is invalid', () => {
    spyOn(sessionStorage, 'setItem');
    spyOn(router, 'navigate');

    component.email?.setValue('');
    component.password?.setValue('');
    fixture.detectChanges();

    component.onSubmit();

    expect(sessionStorage.setItem).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should store user and navigate when form is valid', () => {
    spyOn(sessionStorage, 'setItem');
    spyOn(router, 'navigate');

    component.email?.setValue('test@example.com');
    component.password?.setValue('123456');
    fixture.detectChanges();

    component.onSubmit();

    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify({ email: 'test@example.com', password: '123456' })
    );
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should show required errors when fields are touched empty', () => {
    component.email?.markAsTouched();
    component.password?.markAsTouched();
    fixture.detectChanges();

    const errors = fixture.nativeElement.querySelectorAll('mat-error');
    expect(errors.length).toBeGreaterThan(0);
  });
});
