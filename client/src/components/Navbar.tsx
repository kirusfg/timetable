import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

import List from '@mui/joy/List';
import ListItemButton from '@mui/joy/ListItemButton';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import {
  HomeRounded as HomeIcon,
  GroupRounded as UsersIcon,
  LoginRounded as LoginIcon,
  CalendarTodayRounded as TimetableIcon,
} from '@mui/icons-material';


const Navbar = () => {
  let navigate = useNavigate();

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    page: string
  ) => {
    event.preventDefault();
    navigate(page, { replace: true });
  }

  return (
    <Box
      height='100vh'
      padding='1rem'
      bgcolor='background.level1'
    >
      <List>
        <ListItemButton
          sx={{
            borderRadius: '25%',
            padding: 1,
            minHeight: '0'
          }}
          onClick={(event) => handleNavigation(event, '/')}
        >
          <HomeIcon />
        </ListItemButton>
        <ListItemButton
          sx={{
            borderRadius: '25%',
            padding: 1,
            minHeight: '0'
          }}
          onClick={(event) => handleNavigation(event, '/users')}
        >
          <UsersIcon />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Navbar;
