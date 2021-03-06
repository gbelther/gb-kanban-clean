/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { renderTheme } from '@/main/config/tests/renderTheme';
import { Login } from '.';
import { Validation } from '@/presentation/contracts';
import { Authentication } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';
import { InvalidCredentialsError } from '@/domain/errors';
import { SessionAccountContext } from '@/presentation/contexts/session-account-context';

const makeAuthenticationModel = (): Authentication.Model => ({
  accessToken: faker.datatype.uuid(),
  refreshToken: faker.datatype.uuid(),
  user: {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
  },
});

const makeAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

class ValidationStub implements Validation {
  validate(fieldName: string, input: object): string {
    return null;
  }
}

class AuthenticationSpy implements Authentication {
  account = makeAuthenticationModel();
  params: Authentication.Params;
  callsCount: number = 0;

  async auth(params: Authentication.Params): Promise<AccountModel> {
    this.callsCount += 1;
    this.params = params;
    return this.account;
  }
}

const populateLoginFields = (
  email = faker.internet.email(),
  password = faker.internet.password(),
): void => {
  const inputEmail = screen.getByTestId('login-input-email');
  fireEvent.input(inputEmail, { target: { value: email } });
  const inputPassword = screen.getByTestId('login-input-password');
  fireEvent.input(inputPassword, {
    target: { value: password },
  });
};

const simulateSubmit = async (): Promise<void> => {
  const loginForm = screen.getByTestId('login-form');
  fireEvent.submit(loginForm);
  await waitFor(() => loginForm);
};

const simulateValidSubmit = async (): Promise<void> => {
  populateLoginFields();
  await simulateSubmit();
};

type SutTypes = {
  validationStub: ValidationStub;
  authenticationSpy: AuthenticationSpy;
  setSessionAccountSpy: jest.Mock;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const setSessionAccountSpy = jest.fn();
  renderTheme(
    <SessionAccountContext.Provider
      value={{
        setSessionAccount: setSessionAccountSpy,
        getSessionAccount: jest.fn(),
      }}
    >
      <HistoryRouter history={history}>
        <Login validation={validationStub} authentication={authenticationSpy} />
      </HistoryRouter>
    </SessionAccountContext.Provider>,
  );
  return {
    validationStub,
    authenticationSpy,
    setSessionAccountSpy,
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
    populateLoginFields();
    await waitFor(() => {
      expect(screen.queryByTestId('login-submit-button')).toBeEnabled();
    });
  });

  it('should show email error validation is validation fails', () => {
    const { validationStub } = makeSut();
    const errorMessage = faker.random.words();
    jest
      .spyOn(validationStub, 'validate')
      .mockImplementationOnce(() => errorMessage);
    simulateValidSubmit();
    expect(screen.queryByText(errorMessage)).toBeTruthy();
  });

  it('should call Authentication with correct values', () => {
    const { authenticationSpy } = makeSut();
    const { email, password } = makeAuthenticationParams();
    populateLoginFields(email, password);
    simulateSubmit();
    expect(authenticationSpy.params).toEqual({ email, password });
  });

  it('should call Authentication only if loading is false', async () => {
    const { authenticationSpy } = makeSut();
    await simulateValidSubmit();
    await simulateSubmit();
    expect(authenticationSpy.callsCount).toBe(1);
  });

  it('should show error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error);
    await waitFor(async () => {
      simulateValidSubmit();
      expect(await screen.findByText(error.message)).toBeTruthy();
    });
  });

  it('should call setSessionAccount with correct values if Authentication succeeds', async () => {
    const { authenticationSpy, setSessionAccountSpy } = makeSut();
    const account = makeAuthenticationModel();
    authenticationSpy.account = account;
    await waitFor(() => {
      simulateValidSubmit();
      expect(setSessionAccountSpy).toHaveBeenCalledWith(account);
    });
  });

  it('should redirect to / if Authentication succeeds', async () => {
    makeSut();
    await waitFor(() => {
      simulateValidSubmit();
      expect(history.location.pathname).toBe('/');
    });
  });
});
