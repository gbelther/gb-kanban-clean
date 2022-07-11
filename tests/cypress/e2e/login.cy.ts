import { faker } from '@faker-js/faker';

const makeBodyLoginSucceeds = () => ({
  accessToken: faker.datatype.uuid(),
  refreshToken: faker.datatype.uuid(),
  user: {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
  },
});

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
  ).as('login-unauthorized');
};

const mockLoginSucceeds = (): void => {
  cy.intercept(
    {
      method: 'POST',
      url: '**/sessions',
    },
    {
      statusCode: 200,
      body: makeBodyLoginSucceeds(),
    },
  ).as('login-succeeds');
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

  it('should redirect to / if Authentication succeeds', () => {
    mockLoginSucceeds();
    cy.get('[data-testid=login-input-email]').type(faker.internet.email());
    cy.get('[data-testid=login-input-password]').type(
      faker.internet.password(),
    );
    cy.get('[data-testid=login-submit-button]').click();
    const { baseUrl } = Cypress.config();
    cy.url().should('eq', `${baseUrl}/`);
  });
});
