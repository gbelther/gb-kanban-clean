import { screen } from '@testing-library/react';
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
});
