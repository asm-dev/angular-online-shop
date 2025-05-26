/// <reference types="cypress" />

describe('Checkout flow', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/products', { fixture: 'products.json' }).as(
      'getProducts'
    );
    cy.intercept('GET', '**/products/*', { fixture: 'product.json' }).as(
      'getProduct'
    );
    cy.visit('/login');
  });

  it('should complete a full checkout process', () => {
    // Login
    cy.get('input[name=email]').type('user@example.com');
    cy.get('input[name=password]').type('123456');
    cy.contains('Continuar').click();

    // Ir al Home (ya tiene productos)
    cy.wait('@getProducts');

    // Añadir 2 productos desde Home
    cy.get('mat-card').eq(0).click();
    cy.contains('Añadir al carrito').click();
    cy.go('back');

    cy.get('mat-card').eq(1).click();
    cy.contains('Añadir al carrito').click();
    cy.go('back');

    // Usar la barra de búsqueda del home
    cy.get('input[name=search]').clear().type('shirt');
    cy.wait(500); // debounce simple si hay

    cy.get('mat-card').first().click();
    cy.contains('Añadir al carrito').click();

    // Ir a la cesta
    cy.get('a[aria-label="Cesta"]').click();

    // Formulario de envío
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="address"]').type('123 Main St');
    cy.get('input[name="postalCode"]').type('12345');
    cy.get('input[name="phone"]').type('123456789');
    cy.get('mat-checkbox input').check({ force: true });
    cy.contains('Finalizar compra').click();

    // Pago
    cy.url().should('include', '/basket/checkout');
    cy.get('input[name="cardNumber"]').type('4999999999999999', {
      force: true,
    });
    cy.get('input[name="expiry"]').type('12/29', { force: true });
    cy.get('input[name="cvc"]').type('123', { force: true });
    cy.contains('Pagar').click();

    // Confirmación
    cy.url({ timeout: 4000 }).should('include', '/basket/confirmation');
    cy.contains('Pago completado');
    cy.contains('Volver a la tienda');
  });
});
