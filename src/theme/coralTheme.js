import { createTheme } from '@mui/material';
import { pink } from '@mui/material/colors';

export const coralTheme = createTheme({
    palette: {
        primary: {
            main: '#FF7F50' // Coral
        },
        secondary: {
            main: '#FFDAB9' // Melocotón
        },
        error: {
            main: pink[700] // Rosa intenso para errores
        }
    }
});