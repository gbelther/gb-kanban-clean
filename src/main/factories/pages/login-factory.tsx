import { Login } from '@/presentation/pages/login';
import { makeRemoteAuthentication } from '../usecases';
import { makeLoginValidation } from '../validation';

export const makeLogin = () => (
  <Login
    validation={makeLoginValidation()}
    authentication={makeRemoteAuthentication()}
  />
);
