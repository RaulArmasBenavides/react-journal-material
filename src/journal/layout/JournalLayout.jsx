import { Toolbar } from '@mui/material';
import { Box } from '@mui/system'
import { NavBar, SideBar } from '../components';
import  { useState } from 'react';

const drawerWidth = 280;

export const JournalLayout = ({ children }) => {

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
  };
  return (
    <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn animate__faster'>

        <NavBar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />

        <SideBar drawerWidth={drawerWidth} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

        <Box 
            component='main'
            sx={{ flexGrow: 1, p: 3 }}
        >
            <Toolbar />

            { children }
            
        </Box>
    </Box>
  )
}
