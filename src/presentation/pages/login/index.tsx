import { ChangeEvent, useState } from 'react';
import * as Sty from './styles';

export function Login() {
  const [loginFormValues, setLoginFormValues] = useState({
    email: '',
    password: '',
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
              type="email"
              placeholder="Digite seu E-mail"
              name="email"
              value={loginFormValues.email}
              onChange={handleLoginValuesChange}
            />
            <Sty.Input
              type="password"
              placeholder="Digite sua senha"
              name="password"
              value={loginFormValues.password}
              onChange={handleLoginValuesChange}
            />
          </Sty.Inputs>
          <Sty.Feedback>
            <Sty.SpinnerWrap>
              <Sty.Spinner />
            </Sty.SpinnerWrap>
            <Sty.FeedbackMessage>Error</Sty.FeedbackMessage>
          </Sty.Feedback>
          <Sty.Actions>
            <Sty.Button>Entrar</Sty.Button>
          </Sty.Actions>
        </Sty.Form>
      </Sty.LoginBox>
    </Sty.Container>
  );
}
