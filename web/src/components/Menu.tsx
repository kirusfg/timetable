import * as React from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { useRouter } from 'next/router';
import {
  HomeRounded as HomeIcon,
  GroupRounded as StudentsIcon,
  LoginRounded as LoginIcon,
  CalendarTodayRounded as TimetableIcon,
} from '@mui/icons-material';

const Menu = ({ children }) => {
  const router = useRouter();

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    page: string,
  ) => {
    event.preventDefault();
    setSelectedIndex(index);
    router.push(page);
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.paper' }}>
      <List disablePadding>
        <ListItemButton
          disableGutters
          sx={{ borderRadius: '50%', padding: '1rem' }}
          key='home'
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0, '/')}
        >
          <HomeIcon color={selectedIndex === 0 ? 'primary' : undefined} />
        </ListItemButton>
        <ListItemButton
          disableGutters
          sx={{ borderRadius: '50%', padding: '1rem' }}
          key='students'
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1, '/users')}
        >
          <StudentsIcon color={selectedIndex === 1 ? 'primary' : undefined} />
        </ListItemButton>
        <ListItemButton
          disableGutters
          sx={{ borderRadius: '50%', padding: '1rem' }}
          key='timetable'
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2, '/')}
        >
          <TimetableIcon color={selectedIndex === 2 ? 'primary' : undefined} />
        </ListItemButton>
        <ListItemButton
          disableGutters
          sx={{ borderRadius: '50%', padding: '1rem' }}
          key='login'
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3, '/')}
        >
          <LoginIcon color={selectedIndex === 3 ? 'primary' : undefined} />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Menu;
