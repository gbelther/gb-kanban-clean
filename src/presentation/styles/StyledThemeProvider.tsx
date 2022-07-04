import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './globalStyles';
import { theme } from './theme';

type StyledComponentsProviderProps = {
  children: ReactNode;
};

export function StyledThemeProvider({
  children,
}: StyledComponentsProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
