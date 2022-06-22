import { Outlet } from "react-router-dom";

import Stack from "@mui/material/Stack";
import {
  HomeRounded as HomeIcon,
  GroupRounded as UsersIcon,
  LoginRounded as LoginIcon,
  CalendarTodayRounded as TimetableIcon,
} from "@mui/icons-material";


import Navbar from "./components/navbar/Navbar";
import NavbarItem from "./components/navbar/NavbarItem";


const App = () => {
  return (
    <>
      <Stack direction="row">
        <Navbar>
          <NavbarItem
            title="Home"
            accent="primary.main"
            icon={<HomeIcon fontSize="small" />}
            page="/"
          />
          <NavbarItem
            title="Timetable"
            accent="primary.main"
            icon={<TimetableIcon fontSize="small" />}
            page="/timetable"
          />
          <NavbarItem
            title="Students"
            accent="primary.main"
            icon={<UsersIcon fontSize="small" />}
            page="/users"
          />
          <NavbarItem
            title="Login"
            accent="primary.main"
            icon={<LoginIcon fontSize="small" />}
            page="/login"
          />
        </Navbar>
        <Outlet />
      </Stack>
    </>
  );
}

export default App;
