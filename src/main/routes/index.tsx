import {
  BrowserRouter,
  Routes as RoutesContainer,
  Route,
} from 'react-router-dom';

import { makeLogin } from '../factories/pages';

export function Router() {
  return (
    <BrowserRouter>
      <RoutesContainer>
        <Route path="/login" element={makeLogin()} />
      </RoutesContainer>
    </BrowserRouter>
  );
}
