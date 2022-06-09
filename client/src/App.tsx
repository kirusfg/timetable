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
          <NavbarItem
            title='Home'
            accent='primary.400'
            icon={<HomeIcon />}
            page='/'
          />
          <NavbarItem
            title='Timetable'
            accent='primary.400'
            icon={<TimetableIcon />}
            page='/timetable'
          />
          <NavbarItem
            title='Students'
            accent='primary.400'
            icon={<UsersIcon />}
            page='/users'
          />
          <NavbarItem
            title='Login'
            accent='primary.400'
            icon={<LoginIcon />}
            page='/login'
          />
        </Navbar>
        <Outlet />
      </Stack>
    </>
  );
}

export default App;
