import { ReactNode } from 'react';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';

import { purpleTheme, coralTheme, elegantGreyTheme, oliveTheme, navyTheme } from './';
import { RootState } from '../store/store';

type ThemeKey = 'purple' | 'coral' | 'elegantGrey' | 'olive' | 'navy';

const themes: Record<ThemeKey, any> = {
  purple: purpleTheme,
  coral: coralTheme,
  elegantGrey: elegantGreyTheme,
  olive: oliveTheme,
  navy: navyTheme,
};

interface AppThemeProps {
  children: ReactNode;
}

export const AppTheme = ({ children }: AppThemeProps) => {
  const currentTheme = useSelector((state: RootState) => state.theme.theme) as ThemeKey;
  return (
    <ThemeProvider theme={themes[currentTheme] || navyTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
