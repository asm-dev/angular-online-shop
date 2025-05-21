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
    // Inicio de sesión
    cy.get('input[name=email]').type('user@example.com');
    cy.get('input[name=password]').type('123456');
    cy.contains('Continuar').click();

    // Ir a la página de productos
    cy.contains('Ver productos').click();
    cy.wait('@getProducts');

    // Agregar dos productos al carrito desde los disponibles
    cy.get('mat-card').eq(0).click();
    cy.contains('Añadir al carrito').click();
    cy.go('back');

    cy.get('mat-card').eq(1).click();
    cy.contains('Añadir al carrito').click();

    // Buscar un producto y agregar al carrito
    cy.visit('/home/search');
    cy.get('input').type('shirt');
    cy.wait('@getProducts');
    cy.get('mat-card').first().click();
    cy.contains('Añadir al carrito').click();

    // Ir a la cesta
    cy.contains('Cesta').click();

    // Formulario de compra
    cy.get('input[ngmodel][name="firstName"]').type('John');
    cy.get('input[ngmodel][name="lastName"]').type('Doe');
    cy.get('input[ngmodel][name="address"]').type('123 Street');
    cy.get('input[ngmodel][name="postalCode"]').type('12345');
    cy.get('input[ngmodel][name="phone"]').type('123456789');
    cy.get('mat-checkbox').click();
    cy.contains('Finalizar compra').click();

    // Página de pagos
    cy.url().should('include', '/basket/checkout');
    cy.get('input[name=cardNumber]').type('4999999999999999');
    cy.get('input[name=expiry]').type('12/29');
    cy.get('input[name=cvc]').type('123');
    cy.contains('Pagar').click();

    // Esperamos y confirmamos que la URL cambie a la de confirmación
    cy.url({ timeout: 4000 }).should('include', '/basket/confirmation');
    cy.contains('Pago completado');
    cy.contains('Volver a la tienda');
  });
});
