import { useState } from 'react'

import {
  Outlet,
  useNavigate,
  useResolvedPath,
  useMatch,
} from 'react-router-dom'

import Stack from '@mui/material/Stack'
import {
  HomeRounded as HomeIcon,
  GroupRounded as UsersIcon,
  LoginRounded as LoginIcon,
  LogoutRounded as LogoutIcon,
  CalendarTodayRounded as TimetableIcon,
} from '@mui/icons-material'

import Navbar from './components/navbar/Navbar'
import NavbarItem from './components/navbar/NavbarItem'

import { useAppSelector } from './app/hooks'
import { selectUser } from './app/store/auth/authSlice'
import { useLogoutMutation } from './app/store/api/apiSlice'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const App = () => {
  let navigate = useNavigate()
  let user = useAppSelector(selectUser)

  const [logoutMessageIsOpen, setLogoutMessageIsOpen] = useState(false)
  const [logout] = useLogoutMutation()

  const handleNavigation =
    (route: string) =>
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault()

      navigate(route)
    }

  const handleLoginLogout = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault()

    if (user) {
      logout()
      setLogoutMessageIsOpen(true)
    } else {
      navigate('/auth/login', { replace: true })
    }
  }

  const isSelected = (path: string, isComplex: boolean): boolean => {
    let resolved = useResolvedPath(path)
    let selected = useMatch({ path: resolved.pathname, end: !isComplex })

    return !!selected
  }

  return (
    <>
      <Snackbar
        open={logoutMessageIsOpen}
        autoHideDuration={3000}
        onClose={() => setLogoutMessageIsOpen(false)}
      >
        <Alert
          onClose={() => setLogoutMessageIsOpen(false)}
          severity='success'
          variant='filled'
          sx={{ width: '100%' }}
        >
          This is a success message!
        </Alert>
      </Snackbar>

      <Stack direction='row'>
        <Navbar>
          <NavbarItem
            title='Home'
            accent='primary.main'
            icon={<HomeIcon fontSize='small' />}
            isSelected={isSelected('/', false)}
            clickHandler={handleNavigation('/')}
          />
          <NavbarItem
            title='Timetable'
            accent='primary.main'
            icon={<TimetableIcon fontSize='small' />}
            isSelected={isSelected('/timetable', true)}
            clickHandler={handleNavigation('/timetable/courses')}
          />
          <NavbarItem
            title='Students'
            accent='primary.main'
            icon={<UsersIcon fontSize='small' />}
            isSelected={isSelected('/users', false)}
            clickHandler={handleNavigation('/users')}
          />
          <NavbarItem
            title='Login'
            accent='primary.main'
            icon={
              user ? (
                <LogoutIcon fontSize='small' />
              ) : (
                <LoginIcon fontSize='small' />
              )
            }
            isSelected={isSelected('/auth/login', false)}
            clickHandler={handleLoginLogout}
            last
          />
        </Navbar>
        <Outlet />
      </Stack>
    </>
  )
}

export default App
