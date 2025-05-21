import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

export function localStorageMetaReducer<T>(
  reducer: ActionReducer<T>
): ActionReducer<T> {
  return (state, action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const stored = localStorage.getItem('cartState');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          localStorage.removeItem('cartState');
        }
      }
    }

    const nextState = reducer(state, action);

    const cart = (nextState as any).cart;
    if (cart) {
      localStorage.setItem('cartState', JSON.stringify({ cart }));
    }

    return nextState;
  };
}
