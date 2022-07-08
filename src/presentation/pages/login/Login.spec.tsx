import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { renderTheme } from '@/main/config/tests/renderTheme';
import { Login } from '.';

const makeSut = (): void => {
  renderTheme(<Login />);
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
});
