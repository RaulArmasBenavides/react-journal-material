import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';

import { purpleTheme ,coralTheme,elegantGreyTheme,oliveTheme,navyTheme } from './';
 
const themes = {
  purple: purpleTheme,
  coral: coralTheme,
  elegantGrey: elegantGreyTheme,
  olive: oliveTheme,
  navy: navyTheme,
};
export const AppTheme = ({ children }) => {
  const currentTheme = useSelector((state) => state.theme.theme);
  return (
    <ThemeProvider theme={themes[currentTheme] || navyTheme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      
      { children }
    </ThemeProvider>
  )
}