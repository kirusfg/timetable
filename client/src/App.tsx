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

import { useAppDispatch, useAppSelector } from './app/hooks'
import { selectUser, setUser } from './app/store/auth/authSlice'

const App = () => {
  let navigate = useNavigate()
  let dispatch = useAppDispatch()
  let user = useAppSelector(selectUser)

  const handleNavigation =
    (href: string, needsLogin: boolean) =>
      (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault()

        if (needsLogin && !user) navigate('/auth/login', { replace: true })
        else navigate(href, { replace: true })
      }

  const handleLogin = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault()
    if (user) {
      dispatch(
        setUser({
          access_token: null,
          refresh_token: null,
          user: null,
        })
      )
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
      <Stack direction='row'>
        <Navbar>
          <NavbarItem
            title='Home'
            accent='primary.main'
            icon={<HomeIcon fontSize='small' />}
            isSelected={isSelected('/', false)}
            clickHandler={handleNavigation('/', false)}
          />
          <NavbarItem
            title='Timetable'
            accent='primary.main'
            icon={<TimetableIcon fontSize='small' />}
            isSelected={isSelected('/timetable', true)}
            clickHandler={handleNavigation('/timetable/courses', true)}
            isComplex
          />
          <NavbarItem
            title='Students'
            accent='primary.main'
            icon={<UsersIcon fontSize='small' />}
            isSelected={isSelected('/users', false)}
            clickHandler={handleNavigation('/users', true)}
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
            clickHandler={handleLogin}
            last
          />
        </Navbar>
        <Outlet />
      </Stack>
    </>
  )
}

export default App
