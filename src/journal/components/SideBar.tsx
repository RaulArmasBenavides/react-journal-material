import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { SideBarItem } from './SideBarItem';
import { RootState } from '../../store/store';

interface SideBarProps {
  drawerWidth?: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export const SideBar = ({ drawerWidth = 240, mobileOpen, handleDrawerToggle }: SideBarProps) => {
  const { displayName } = useSelector((state: RootState) => state.auth);
  const { notes } = useSelector((state: RootState) => state.journal);

  const drawerContent = (displayName: string | null, notes: any[]) => (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
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
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        {drawerContent(displayName, notes)}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
        open
      >
        {drawerContent(displayName, notes)}
      </Drawer>
    </Box>
  );
};
