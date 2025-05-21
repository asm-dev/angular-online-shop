import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductPageComponent } from './product-page/product-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductPageComponent,
  },
  {
    path: ':id',
    component: ProductDetailsComponent,
  },
];
