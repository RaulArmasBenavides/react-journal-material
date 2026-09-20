import { createTheme } from '@mui/material';
import { teal } from '@mui/material/colors';

export const elegantGreyTheme = createTheme({
  palette: {
    primary: {
      main: '#4B4B4B'
    },
    secondary: {
      main: '#9E9E9E'
    },
    error: {
      main: teal.A400
    }
  }
});
