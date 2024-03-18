import { createTheme } from '@mui/material';
import { orange } from '@mui/material/colors';

export const oliveTheme = createTheme({
    palette: {
        primary: {
            main: '#808000' // Verde oliva
        },
        secondary: {
            main: '#bcb88a' // Oliva claro
        },
        error: {
            main: orange[500] // Naranja para errores
        }
    }
});