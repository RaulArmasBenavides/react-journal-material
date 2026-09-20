import { createTheme } from '@mui/material';
import { orange } from '@mui/material/colors';

export const oliveTheme = createTheme({
  palette: {
    primary: {
      main: '#808000'
    },
    secondary: {
      main: '#bcb88a'
    },
    error: {
      main: orange[500]
    }
  }
});
