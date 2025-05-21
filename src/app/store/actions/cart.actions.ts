import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../interfaces/product.interface';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Add Item': props<{ product: Product; quantity: number }>(),
    'Remove Item': props<{ productId: number }>(),
    'Clear Cart': emptyProps(),
  },
});
