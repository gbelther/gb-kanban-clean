import {
  BrowserRouter,
  Routes as RoutesContainer,
  Route,
} from 'react-router-dom';
import { SessionAccountContextProvider } from '@/presentation/contexts/session-account-context';
import { makeBoard, makeLogin } from '../factories/pages';

export function Router() {
  return (
    <SessionAccountContextProvider>
      <BrowserRouter>
        <RoutesContainer>
          <Route path="/login" element={makeLogin()} />
          <Route path="/" element={makeBoard()} />
        </RoutesContainer>
      </BrowserRouter>
    </SessionAccountContextProvider>
  );
}
