import { createTheme } from '@mui/material';
import { blue, green } from '@mui/material/colors';

export const navyTheme = createTheme({
    palette: {
        primary: {
            main: '#003366' // Azul marino oscuro
        },
        secondary: {
            main: '#006699' // Azul marino claro
        },
        error: {
            main: green[800] // Verde oscuro para errores, un cambio para variar
        }
    }
});