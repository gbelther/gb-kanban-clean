import { Login } from '@/presentation/pages/login';
import { makeLoginValidation } from '../validation';

export const makeLogin = () => <Login validation={makeLoginValidation()} />;
