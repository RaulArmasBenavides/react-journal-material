import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';
import { setActiveNote } from '../../store/journal';
import { AppDispatch } from '../../store/store';

interface SideBarItemProps {
  title?: string;
  body?: string;
  id: string;
  date?: number;
  imageUrls?: string[];
}

export const SideBarItem = ({ title = '', body = '', id, date, imageUrls = [] }: SideBarItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const onClickNote = () => {
    dispatch(setActiveNote({ title, body, id, date, imageUrls }));
  };

  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + '...' : title;
  }, [title]);

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <div style={{ width: '100%' }}>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </div>
      </ListItemButton>
    </ListItem>
  );
};
