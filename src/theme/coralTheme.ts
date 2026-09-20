import { createTheme } from '@mui/material';
import { pink } from '@mui/material/colors';

export const coralTheme = createTheme({
  palette: {
    primary: {
      main: '#FF7F50'
    },
    secondary: {
      main: '#FFDAB9'
    },
    error: {
      main: pink[700]
    }
  }
});
