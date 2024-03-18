import { createTheme } from '@mui/material';
import { grey, teal } from '@mui/material/colors';

export const elegantGreyTheme = createTheme({
    palette: {
        primary: {
            main: '#4B4B4B' // Gris oscuro
        },
        secondary: {
            main: '#9E9E9E' // Gris medio
        },
        error: {
            main: teal['A400'] // Teal para un toque de color
        }
    }
});