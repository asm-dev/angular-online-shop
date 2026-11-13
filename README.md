# Online store project

This is an incremental technical project developed as part of the Master's in Web Development at UEM. It is built with Angular 19, Angular Material and NgRx, following Clean Code principles and best practices. The main goal of the activity is to build a modular, maintainable and properly tested online store.

![image](https://github.com/user-attachments/assets/ed3acda5-41d4-4bca-a73a-4dee5a8b3ede)

## Requirements

1. **Component structure and responsive design**:

   - Components such as `tooltip`, `footer`, `home`, `product`, `basket`, `checkout`, `confirmation` are organized modularly.
   - Mobile/desktop adaptive design with conditional menus (`mat-menu` and `mat-toolbar`), fluid styles (`vh`, media queries).
   - `tooltip` component with a representative background image, responsive logo, and menus adapted to the resolution.

2. **Routing and navigation**:

   - Routes organized by feature (`auth.routes.ts`, `product.routes.ts`, etc.) and grouped in `app.routes.ts` for lazy loading.
   - Functional navigation through `RouterLink`, `router-outlet`, and conditional navigation based on login.

3. **Login, registration and session**:

   - Login and registration form with reactive validations.
   - Session data persistence in `sessionStorage`.
   - Post-login redirects to `home`.

4. **Global state management with NgRx**:

   - Store configured with a clean structure: `actions`, `reducers`, `effects`, `selectors`.
   - Basket persistence in `localStorage` to keep state after reloads.
   - Product selection and reactive cart updates through actions.

5. **External API integration**:

   - Product data obtained from [FakeStoreAPI](https://fakestoreapi.com/docs).
   - `ProductService` service with HttpClient and interception in tests.

6. **Shopping cart and payment process**:

   - Basket with product summary, shipping form and purchase button.
   - `checkout` page with simulated card validation.
   - Payment check with loading and redirect to `confirmation`.

7. **Testing**:
   - Unit tests for components and services.
   - E2E tests in Cypress (`checkout-flow.cy.ts`) that simulate a purchase flow.

![image](https://github.com/user-attachments/assets/b8d3ea34-79a2-4407-818a-7ed3ec39b0a8)

## Evaluation recommendations

Although the E2E tests validate the complete purchase flow, if you want to try navigating the site yourself, I invite you to:

- Check the responsive behavior (adaptive toolbar, mobile layout).
- Add 3 products to the cart and complete the checkout with valid data (4999...).
- Inspect `sessionStorage` and `localStorage` to see how the login state is persisted.
- Query the store with NgRx DevTools to check the flow of actions.
