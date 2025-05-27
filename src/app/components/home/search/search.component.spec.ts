import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;

    spyOn(component, 'ngOnInit').and.callFake(() => {});

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render input with placeholder', () => {
    const inputEl: HTMLInputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;
    expect(inputEl.placeholder).toBe('Buscar productos');
  });

  it('should update term and emit value when input changes', () => {
    spyOn(component.search, 'emit');

    const inputEl: HTMLInputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;
    inputEl.value = 'camiseta';
    inputEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.term).toBe('camiseta');
    expect(component.search.emit).toHaveBeenCalledWith('camiseta');
  });
});
