import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TooltipComponent } from './tooltip.component';

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TooltipComponent,
        RouterModule.forRoot([]),
        MatMenuModule,
        MatIconModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo image', () => {
    const imgEl: HTMLImageElement = fixture.debugElement.query(
      By.css('img.logo')
    ).nativeElement;
    expect(imgEl).toBeTruthy();
    expect(imgEl.src).toContain('/images/shop-logo.png');
    expect(imgEl.alt).toBe('Logo de la tienda');
  });

  it('should have desktop basket and login links', () => {
    const links = fixture.debugElement.queryAll(By.css('.desktop-menu a'));
    expect(links.length).toBe(2);

    const basketLink = links[0].attributes['ng-reflect-router-link'];
    const loginLink = links[1].attributes['ng-reflect-router-link'];

    expect(basketLink).toContain('/basket');
    expect(loginLink).toContain('/login');
  });

  it('should have mobile menu buttons with text', async () => {
    const triggerButton = fixture.debugElement.query(
      By.css('.mobile-menu button[mat-icon-button]')
    );
    triggerButton.nativeElement.click();
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();

    const menuItems = document.querySelectorAll('button[mat-menu-item]');
    const texts = Array.from(menuItems).map((el) => el.textContent ?? '');

    expect(texts.some((t) => t.includes('Cesta'))).toBeTrue();
    expect(texts.some((t) => t.includes('Iniciar sesión'))).toBeTrue();
  });
});
