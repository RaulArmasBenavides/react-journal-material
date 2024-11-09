import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { SideBarItem } from './';
import PropTypes from 'prop-types';

export const SideBar = ({ drawerWidth = 240 ,mobileOpen, handleDrawerToggle}) => {

    const { displayName } = useSelector( state => state.auth );
    const { notes } = useSelector( state => state.journal );


    const drawerContent = (displayName, notes) => (
        <>
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>
                    {displayName}
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {notes.map(note => (
                    <SideBarItem key={note.id} {...note} />
                ))}
            </List>
        </>
    );


    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
              {/* Drawer for mobile */}
            <Drawer
                variant='temporary'
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                {drawerContent(displayName, notes)}
            </Drawer>

            {/* Drawer for desktop */}
            <Drawer
                variant='permanent'
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
                open
            >
                {drawerContent(displayName, notes)}
            </Drawer>

        </Box>
    )
}

SideBar.propTypes = {
    drawerWidth: PropTypes.number,
    mobileOpen: PropTypes.bool.isRequired,
    handleDrawerToggle: PropTypes.func.isRequired
};