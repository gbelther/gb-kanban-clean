/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import userEvent from '@testing-library/user-event';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { renderTheme } from '@/main/config/tests/renderTheme';
import { Login } from '.';
import { Validation } from '@/presentation/contracts';
import { Authentication } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';

const makeAuthenticationModel = (): Authentication.Model => ({
  accessToken: faker.datatype.uuid(),
  refreshToken: faker.datatype.uuid(),
  user: {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
  },
});

class ValidationStub implements Validation {
  validate(fieldName: string, input: object): string {
    return null;
  }
}

class AuthenticationSpy implements Authentication {
  account = makeAuthenticationModel();
  params: Authentication.Params;

  async auth(params: Authentication.Params): Promise<AccountModel> {
    this.params = params;
    return this.account;
  }
}

type SutTypes = {
  validationStub: ValidationStub;
  authenticationSpy: AuthenticationSpy;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  renderTheme(
    <Login validation={validationStub} authentication={authenticationSpy} />,
  );
  return {
    validationStub,
    authenticationSpy,
  };
};

describe('<Login />', () => {
  it('email input should start with correct value', () => {
    makeSut();
    expect(screen.getByTestId('login-input-email')).toHaveAttribute(
      'value',
      '',
    );
  });

  it('password input should start with correct value', () => {
    makeSut();
    expect(screen.getByTestId('login-input-password')).toHaveAttribute(
      'value',
      '',
    );
  });

  it('should not show spinner when render page', () => {
    makeSut();
    expect(screen.queryByTestId('login-spinner')).toBeFalsy();
  });

  it('should not show error message when render page', () => {
    makeSut();
    expect(screen.queryByTestId('login-error-message')).toBeFalsy();
  });

  it('should render button disabled if any input value is empty', () => {
    makeSut();
    expect(screen.queryByTestId('login-submit-button')).toBeDisabled();
  });

  it('should render button enabled if both inputs values is not empty', async () => {
    makeSut();
    const inputEmail = screen.getByTestId('login-input-email');
    userEvent.type(inputEmail, faker.internet.email());
    const inputPassword = screen.getByTestId('login-input-password');
    userEvent.type(inputPassword, faker.internet.password());
    await waitFor(() => {
      expect(screen.queryByTestId('login-submit-button')).toBeEnabled();
    });
  });

  it('should show email error validation is validation fails', async () => {
    const { validationStub } = makeSut();
    const errorMessage = faker.random.words();
    jest
      .spyOn(validationStub, 'validate')
      .mockImplementationOnce(() => errorMessage);
    const inputEmail = screen.getByTestId('login-input-email');
    userEvent.type(inputEmail, faker.random.word());
    const inputPassword = screen.getByTestId('login-input-password');
    userEvent.type(inputPassword, faker.internet.password());
    fireEvent.submit(screen.getByTestId('login-form'));
    expect(screen.queryByText(errorMessage)).toBeTruthy();
  });

  it('should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut();
    const email = faker.random.word();
    const password = faker.internet.password();
    const inputEmail = screen.getByTestId('login-input-email');
    userEvent.type(inputEmail, email);
    const inputPassword = screen.getByTestId('login-input-password');
    userEvent.type(inputPassword, password);
    fireEvent.submit(screen.getByTestId('login-form'));
    await authenticationSpy.auth({ email, password });
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });
});
