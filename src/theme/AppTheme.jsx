import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import { purpleTheme } from './';
import { coralTheme} from './';

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ coralTheme }>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      
      { children }
    </ThemeProvider>
  )
}
