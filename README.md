# Proyecto de tienda online

Este es un proyecto técnico incremental desarrollado como parte del Máster en Desarrollo Web de la UEM. Está creado con Angular 19, Angular Material y NgRx, siguiendo los principios de Clean Code y buenas prácticas. El objetivo principal de la actividad es construir una tienda online modular, mantenible, y correctamente testeada.

![image](https://github.com/user-attachments/assets/ed3acda5-41d4-4bca-a73a-4dee5a8b3ede)

## Requerimientos

1. **Estructura de componentes y diseño responsive**:

   - Componentes como `tooltip`, `footer`, `home`, `product`, `basket`, `checkout`, `confirmation` están organizados de forma modular.
   - Diseño adaptable móvil/escritorio con menús condicionales (`mat-menu` y `mat-toolbar`), estilos fluidos (`vh`, media queries).
   - Componente `tooltip` con imagen de fondo representativa, logo responsivo, y menús adaptados a la resolución.

2. **Routing y navegación**:

   - Rutas organizadas por feature (`auth.routes.ts`, `product.routes.ts`, etc.) y agrupadas en `app.routes.ts` para lazy loading.
   - Navegación funcional a través de `RouterLink`, `router-outlet`, y navegación condicional basada en login.

3. **Login, registro y sesión**:

   - Formulario de login y registro con validaciones reactivas.
   - Persistencia de datos de sesión en `sessionStorage`.
   - Redirecciones post-login al `home`.

4. **Gestión de estado global con NgRx**:

   - Store configurado con estructura limpia: `actions`, `reducers`, `effects`, `selectors`.
   - Persistencia de la cesta en `localStorage` para mantener estado tras recargas.
   - Selección de productos y actualización reactiva del carrito mediante acciones.

5. **Integración con API externa**:

   - Datos de productos obtenidos de [FakeStoreAPI](https://fakestoreapi.com/docs).
   - Servicio `ProductService` con HttpClient e interceptación en tests.

6. **Carrito de compra y proceso de pago**:

   - Cesta con resumen de productos, formulario de envío y botón de compra.
   - Página de `checkout` con validación de tarjeta simulada.
   - Comprobación de pago con loading y redirección a `confirmation`.

7. **Testing**:
   - Unit tests para componentes y servicios.
   - E2E tests en Cypress (`checkout-flow.cy.ts`) que simulan un flow de compra.

![image](https://github.com/user-attachments/assets/b8d3ea34-79a2-4407-818a-7ed3ec39b0a8)

## Recomendaciones para la evaluación

Aunque las pruebas E2E validan el flijo completo de compra, si quieres probar a navegar en el sitio te invito a:

- Verificar el comportamiento responsive (toolbar adaptativo, diseño móvil).
- Añadir 3 productos al carrito y completa el checkout con datos válidos (4999...).
- Inspeccionar el `sessionStorage` y `localStorage` para ver cómo se persiste el estado de inicio del sesión.
- Consultar la store con DevTools de NgRx para comprobar el flujo de acciones.
