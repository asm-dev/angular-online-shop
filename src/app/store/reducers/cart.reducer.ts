import { createReducer, on } from '@ngrx/store';
import { Product } from '../../interfaces/product.interface';
import { CartActions } from '../actions/cart.actions';

export interface CartItem {
  product: Product;
  quantity: number;
}

export type CartState = CartItem[];

export const initialState: CartState = [];

export const cartReducer = createReducer(
  initialState,

  on(CartActions.addItem, (state, { product, quantity }) => {
    const existing = state.find((item) => item.product.id === product.id);
    if (existing) {
      return state.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      return [...state, { product, quantity }];
    }
  }),

  on(CartActions.removeItem, (state, { productId }) =>
    state.filter((item) => item.product.id !== productId)
  ),

  on(CartActions.clearCart, () => [])
);
