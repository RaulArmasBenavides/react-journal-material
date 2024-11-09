import { useDispatch } from 'react-redux';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Grid, IconButton,Menu,MenuItem,  Toolbar, Typography,Tooltip } from '@mui/material';
import { LogoutOutlined, MenuOutlined,ColorLensOutlined  } from '@mui/icons-material';
import { startLogout } from '../../store/auth';
import { setTheme } from '../../store/theme';
export const NavBar = ({ drawerWidth = 240,handleDrawerToggle  }) => {

    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const onLogout = () => {
        dispatch( startLogout() );
    }
    const handleThemeMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleThemeMenuClose = (theme) => {
        if (theme) {
          dispatch(setTheme(theme)); // Actualiza el tema en Redux
        }
        setAnchorEl(null);
      };

  return (
    <AppBar 
        position='fixed'
        sx={{ 
            width: { sm: `calc(100% - ${ drawerWidth }px)` },
            ml: { sm: `${ drawerWidth }px` }
         }}
    >
        <Toolbar>
            <IconButton
                color='inherit'
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuOutlined />
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' noWrap component='div'> JournalApp </Typography>

                <Tooltip title="Cambiar tema">
                <IconButton color='inherit' onClick={handleThemeMenuOpen}>
                    <ColorLensOutlined />
                </IconButton>
                </Tooltip>

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => handleThemeMenuClose()}
                        >
                            <MenuItem onClick={() => handleThemeMenuClose('purple')}>Purple</MenuItem>
                            <MenuItem onClick={() => handleThemeMenuClose('coral')}>Coral</MenuItem>
                            <MenuItem onClick={() => handleThemeMenuClose('elegantGrey')}>Grey</MenuItem>
                            <MenuItem onClick={() => handleThemeMenuClose('olive')}>Olive</MenuItem>
                            <MenuItem onClick={() => handleThemeMenuClose('navy')}>Navy</MenuItem>
                        </Menu>
            

                <Tooltip title="Cerrar sesión">
                    <IconButton 
                        color='error'
                        onClick={ onLogout }
                    >
                        <LogoutOutlined />
                    </IconButton>
                </Tooltip>
            </Grid>

        </Toolbar>
    </AppBar>
  )
}


NavBar.propTypes = {
    drawerWidth: PropTypes.number,
    handleDrawerToggle: PropTypes.func.isRequired
};