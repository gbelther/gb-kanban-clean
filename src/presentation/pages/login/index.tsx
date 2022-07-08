import { ChangeEvent, useState } from 'react';
import * as Sty from './styles';

export function Login() {
  const [loadingSubmit] = useState(false);
  const [loginFormValues, setLoginFormValues] = useState({
    email: '',
    password: '',
  });
  const [loginFormErrors] = useState({
    email: '',
    password: '',
    general: '',
  });

  const handleLoginValuesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginFormValues(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Sty.Container>
      <Sty.LoginBox>
        <Sty.Title>Faça login</Sty.Title>
        <Sty.Form>
          <Sty.Inputs>
            <Sty.Input
              data-testid="login-input-email"
              type="email"
              placeholder="Digite seu E-mail"
              name="email"
              value={loginFormValues.email}
              onChange={handleLoginValuesChange}
            />
            <Sty.Input
              data-testid="login-input-password"
              type="password"
              placeholder="Digite sua senha"
              name="password"
              value={loginFormValues.password}
              onChange={handleLoginValuesChange}
            />
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
            <Sty.Button>Entrar</Sty.Button>
          </Sty.Actions>
        </Sty.Form>
      </Sty.LoginBox>
    </Sty.Container>
  );
}
