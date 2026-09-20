import { createTheme } from '@mui/material';
import { green } from '@mui/material/colors';

export const navyTheme = createTheme({
  palette: {
    primary: {
      main: '#003366'
    },
    secondary: {
      main: '#006699'
    },
    error: {
      main: green[800]
    }
  }
});
