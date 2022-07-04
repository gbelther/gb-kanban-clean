import { StyledThemeProvider } from '@/presentation/styles/StyledThemeProvider';
import { Router } from './routes';

export function App() {
  return (
    <StyledThemeProvider>
      <Router />
    </StyledThemeProvider>
  );
}
