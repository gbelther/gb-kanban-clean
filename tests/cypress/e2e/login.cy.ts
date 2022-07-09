import { faker } from '@faker-js/faker';

const mockLoginUnauthorizedError = (): void => {
  cy.intercept(
    {
      method: 'POST',
      url: '**/sessions',
    },
    {
      statusCode: 401,
      body: {
        error: faker.random.words(),
      },
    },
  ).as('login');
};

describe('<Login />', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should start with correct values', () => {
    cy.get('[data-testid=login-input-email]').should('have.value', '');
    cy.get('[data-testid=login-input-password]').should('have.value', '');
    cy.get('[data-testid=login-submit-button]').should('be.disabled');
  });

  it('should show error if email is invalid', () => {
    cy.get('[data-testid=login-input-email]').type(faker.random.word());
    cy.get('[data-testid=login-input-password]').type(
      faker.internet.password(),
    );
    cy.get('[data-testid=login-submit-button]').click();
    cy.get('[data-testid=login-email-error]').should('be.visible');
  });

  it('should show error if credentials are invalids', () => {
    mockLoginUnauthorizedError();
    cy.get('[data-testid=login-input-email]').type(faker.internet.email());
    cy.get('[data-testid=login-input-password]').type(
      faker.internet.password(),
    );
    cy.get('[data-testid=login-submit-button]').click();
    cy.get('[data-testid=login-error-message]').should('be.visible');
  });
});
