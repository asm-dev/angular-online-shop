import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, withDisabledInitialNavigation } from '@angular/router';
import { ConfirmationComponent } from './confirmation.component';

describe('ConfirmationComponent', () => {
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationComponent],
      providers: [provideRouter([], withDisabledInitialNavigation())],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display confirmation messages', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Pago completado');
    expect(text).toContain('Gracias por tu compra.');
  });

  it('should have a button linking to the home page', () => {
    const button = fixture.debugElement.query(
      By.css('[data-testid="back-button"]')
    );
    expect(button).toBeTruthy();
    expect(button.attributes['routerLink']).toBe('/');
    expect(button.nativeElement.textContent.trim()).toContain(
      'Volver a la tienda'
    );
  });
});
