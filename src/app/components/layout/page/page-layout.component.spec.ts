import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { PageLayoutComponent } from './page-layout.component';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  template: '<div class="mock-tooltip">Tooltip</div>',
})
class MockTooltipComponent {}

@Component({
  selector: 'app-footer',
  standalone: true,
  template: '<footer class="mock-footer">Footer</footer>',
})
class MockFooterComponent {}

@Component({
  standalone: true,
  selector: 'app-host',
  imports: [PageLayoutComponent],
  template: `
    <app-page-layout>
      <div class="test-content">Contenido proyectado</div>
    </app-page-layout>
  `,
})
class HostComponent {}

describe('PageLayoutComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideRouter([], withEnabledBlockingInitialNavigation())],
    })
      .overrideComponent(PageLayoutComponent, {
        set: {
          imports: [MockTooltipComponent, MockFooterComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create the page layout with tooltip and footer', () => {
    const tooltip = fixture.debugElement.query(By.css('.mock-tooltip'));
    const footer = fixture.debugElement.query(By.css('.mock-footer'));
    expect(tooltip).toBeTruthy();
    expect(footer).toBeTruthy();
  });

  it('should project content inside <ng-content>', () => {
    const projected = fixture.debugElement.query(By.css('.test-content'));
    expect(projected.nativeElement.textContent).toContain(
      'Contenido proyectado'
    );
  });
});
