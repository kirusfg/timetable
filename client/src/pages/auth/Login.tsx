import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

import Page from '../page/Page'
import PageBody from '../page/PageBody'
import PageHeader from '../page/PageHeader'

import { useLoginQuery } from '../../app/store/api/apiSlice'
import { Login, selectUser } from '../../app/store/auth/authSlice'
import { useAppSelector } from '../../app/hooks'

const LoginPage = () => {
  let navigate = useNavigate()

  const user = useAppSelector(selectUser)

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [firstLoad, setFirstLoad] = useState<boolean>(true)
  const [login, setLogin] = useState<Login>({ username, password })
  const { data, error, isLoading } = useLoginQuery(login, { skip: firstLoad })

  const inputHandler =
    (setState: Dispatch<SetStateAction<string>>) =>
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.preventDefault()
        setState(event.target.value)
      }

  const loginHandler = () => {
    setLogin({ username, password })
    setFirstLoad(false)
  }

  useEffect(() => {
    if (user)
      navigate('../../', { replace: true })
  }, [])

  useEffect(() => {
    if (data?.user?.username === username) {
      setTimeout(() => {
        navigate('../../', { replace: true })
      }, 1000)
    }
  }, [data, username])

  return (
    <Page>
      <PageHeader title='Login'>
        <Typography variant='body2'>Header extra</Typography>
      </PageHeader>
      <PageBody>
        <Stack sx={{ height: '100%' }} direction='row' spacing={2}>
          <Paper
            elevation={12}
            sx={{
              padding: 4,
              width: 'auto',
              minWidth: '400px',
              height: 'auto',
            }}
          >
            <Stack sx={{ height: '100%' }} direction='column' spacing={2}>
              <Typography variant='h4'>Login</Typography>

              {(username || password) && error ? (
                <Alert severity='error'>
                  <AlertTitle>Error</AlertTitle>
                  The login/password pair is incorrect
                </Alert>
              ) : null}

              {data ? (
                <Alert severity='success'>
                  <AlertTitle>Success</AlertTitle>
                  Logged in as {data.user?.username}. Redirecting...
                </Alert>
              ) : (
                <p>Not logged in</p>
              )}

              <FormControl>
                <TextField
                  required
                  id='email-username'
                  label='Email or username'
                  defaultValue=''
                  margin='dense'
                  onChange={inputHandler(setUsername)}
                />
                <TextField
                  required
                  type='password'
                  id='password'
                  label='Password'
                  defaultValue=''
                  margin='dense'
                  onChange={inputHandler(setPassword)}
                />
                <Stack sx={{ height: '100%' }} direction='row' spacing={2}>
                  <Button variant='contained' onClick={loginHandler}>
                    Login
                  </Button>
                  {isLoading ? <CircularProgress /> : null}
                </Stack>
              </FormControl>
            </Stack>
          </Paper>
        </Stack>
      </PageBody>
    </Page>
  )
}

export default LoginPage
