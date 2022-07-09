import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { Validation } from '@/presentation/contracts';
import { Authentication } from '@/domain/usecases';
import * as Sty from './styles';

type LoginProps = {
  validation: Validation;
  authentication: Authentication;
};

const loginFormErrorsInitial = {
  email: '',
  password: '',
  general: '',
};

export function Login({ validation, authentication }: LoginProps) {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loginFormValues, setLoginFormValues] = useState({
    email: '',
    password: '',
  });
  const [loginFormErrors, setLoginFormErrors] = useState(
    loginFormErrorsInitial,
  );

  const validate = (fieldName: string): boolean => {
    const error = validation.validate(fieldName, loginFormValues);
    if (error)
      setLoginFormErrors(prevState => ({ ...prevState, [fieldName]: error }));
    return !error;
  };

  const handleLoginValuesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginFormValues(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const emailIsValid = validate('email');
    const passwordIsValid = validate('password');

    if (loadingSubmit || !emailIsValid || !passwordIsValid) {
      return;
    }

    setLoginFormErrors(loginFormErrorsInitial);
    setLoadingSubmit(true);

    try {
      await authentication.auth({
        email: loginFormValues.email,
        password: loginFormValues.password,
      });
    } catch (error) {
      setLoginFormErrors(prevState => ({
        ...prevState,
        general: error.message,
      }));
    } finally {
      setLoadingSubmit(false);
    }
  };

  const buttonSubmitIsDisabled = useMemo(
    () => !loginFormValues.email || !loginFormValues.password,
    [loginFormValues],
  );

  return (
    <Sty.Container>
      <Sty.LoginBox>
        <Sty.Title>Faça login</Sty.Title>
        <Sty.Form
          data-testid="login-form"
          noValidate
          onSubmit={handleLoginSubmit}
        >
          <Sty.Inputs>
            <Sty.InputBox>
              <Sty.Input
                data-testid="login-input-email"
                type="email"
                placeholder="Digite seu E-mail"
                name="email"
                value={loginFormValues.email}
                onChange={handleLoginValuesChange}
              />
              {loginFormErrors.email && (
                <Sty.ErrorMessage data-testid="login-email-error">
                  {loginFormErrors.email}
                </Sty.ErrorMessage>
              )}
            </Sty.InputBox>
            <Sty.InputBox>
              <Sty.Input
                data-testid="login-input-password"
                type="password"
                placeholder="Digite sua senha"
                name="password"
                value={loginFormValues.password}
                onChange={handleLoginValuesChange}
              />
            </Sty.InputBox>
          </Sty.Inputs>
          <Sty.Feedback>
            {loadingSubmit && (
              <Sty.SpinnerWrap data-testid="login-input-password">
                <Sty.Spinner />
              </Sty.SpinnerWrap>
            )}
            {loginFormErrors.general && (
              <Sty.FeedbackMessage data-testid="login-error-message">
                {loginFormErrors.general}
              </Sty.FeedbackMessage>
            )}
          </Sty.Feedback>
          <Sty.Actions>
            <Sty.Button
              data-testid="login-submit-button"
              type="submit"
              disabled={buttonSubmitIsDisabled}
            >
              Entrar
            </Sty.Button>
          </Sty.Actions>
        </Sty.Form>
      </Sty.LoginBox>
    </Sty.Container>
  );
}
