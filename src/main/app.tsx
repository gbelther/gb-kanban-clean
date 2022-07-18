import { QueryClient, QueryClientProvider } from 'react-query';
import { StyledThemeProvider } from '@/presentation/styles/StyledThemeProvider';
import { Router } from './routes';

export function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <StyledThemeProvider>
        <Router />
      </StyledThemeProvider>
    </QueryClientProvider>
  );
}
