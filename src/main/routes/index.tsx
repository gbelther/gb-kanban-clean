import {
  BrowserRouter,
  Routes as RoutesContainer,
  Route,
} from 'react-router-dom';
import { Login } from '@/presentation/pages/login';

export function Router() {
  return (
    <BrowserRouter>
      <RoutesContainer>
        <Route path="/login" element={<Login />} />
      </RoutesContainer>
    </BrowserRouter>
  );
}
