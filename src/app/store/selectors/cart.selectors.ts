import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from '../reducers/cart.reducer';

export const selectCart = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(selectCart, (state) => state);

export const selectCartTotal = createSelector(selectCart, (state) =>
  state.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
);
