import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { TooltipComponent } from '../tooltip/tooltip.component';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [TooltipComponent, FooterComponent],
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
})
export class PageLayoutComponent {}
