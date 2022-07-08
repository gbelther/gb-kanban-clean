import * as Sty from './styles';

export function Login() {
  return (
    <Sty.Container>
      <Sty.LoginBox>
        <Sty.Title>Faça login</Sty.Title>
        <Sty.Form>
          <Sty.Inputs>
            <Sty.Input type="email" placeholder="Digite seu E-mail" />
            <Sty.Input type="password" placeholder="Digite sua senha" />
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
