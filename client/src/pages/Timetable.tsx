import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Page from './Page';
import { useGetCoursesQuery } from '../features/api/apiSlice';


const Timetable = () => {
  const { data, error, isLoading } = useGetCoursesQuery();

  return (
    <Page title='Courses List'>
      {isLoading ?
        (<>
          <CircularProgress />
        </>) : error ?
          (<>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              This is an error alert — <strong>check it out!</strong>
            </Alert>
          </>) : data ?
            (<Card
              sx={{
                minWidth: '260px',
                gap: 2,
                bgcolor: 'background.body',
              }}
            >
              <CardContent>
                Yosemite Park
              </CardContent>
            </Card>) :
            null}
    </Page>
  );
}

export default Timetable;

