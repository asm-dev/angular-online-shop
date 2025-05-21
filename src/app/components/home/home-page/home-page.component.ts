import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageLayoutComponent } from '../../layout/page/page-layout.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, PageLayoutComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {}
