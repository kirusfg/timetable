import { Outlet } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import {
  HomeRounded as HomeIcon,
  GroupRounded as UsersIcon,
  LoginRounded as LoginIcon,
  CalendarTodayRounded as TimetableIcon,
} from '@mui/icons-material';


import Navbar from './components/navbar/Navbar';
import NavbarItem from './components/navbar/NavbarItem';


const App = () => {
  return (
    <>
      <Stack direction='row'>
        <Navbar>
          <NavbarItem icon={<HomeIcon />} page='/' />
          <NavbarItem icon={<TimetableIcon />} page='/timetable' />
          <NavbarItem icon={<UsersIcon />} page='/users' />
          <NavbarItem icon={<LoginIcon />} page='/login' />
        </Navbar>
        <Outlet />
      </Stack>
    </>
  );
}

export default App;
