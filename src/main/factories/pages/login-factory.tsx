import { Login } from '@/presentation/pages/login';
import { SessionAccountContextProvider } from '@/presentation/contexts/session-account-context';
import { makeRemoteAuthentication } from '../usecases';
import { makeLoginValidation } from '../validation';

export const makeLogin = () => (
  <SessionAccountContextProvider>
    <Login
      validation={makeLoginValidation()}
      authentication={makeRemoteAuthentication()}
    />
  </SessionAccountContextProvider>
);
