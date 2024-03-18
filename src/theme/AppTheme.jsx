import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import { purpleTheme ,coralTheme,elegantGreyTheme,oliveTheme,navyTheme } from './';
 

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ navyTheme }>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      
      { children }
    </ThemeProvider>
  )
}