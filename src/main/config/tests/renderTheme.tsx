import 'jest-styled-components';
import { ReactNode } from 'react';
import { render, RenderResult } from '@testing-library/react';
import { StyledThemeProvider } from '@/presentation/styles/StyledThemeProvider';

export const renderTheme = (children: ReactNode): RenderResult =>
  render(<StyledThemeProvider>{children}</StyledThemeProvider>);
