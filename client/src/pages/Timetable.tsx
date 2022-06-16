import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import CardContent from '@mui/joy/CardContent';
import AspectRatio from '@mui/joy/AspectRatio';

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
              row
              variant="outlined"
              sx={{
                minWidth: '260px',
                gap: 2,
                bgcolor: 'background.body',
              }}
            >
              <CardOverflow>
                <AspectRatio ratio="1" sx={{ width: 90 }}>
                  <img
                    src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387"
                    alt=""
                  />
                </AspectRatio>
              </CardOverflow>
              <CardContent>
                <Typography fontWeight="md" textColor="success.plainColor" mb={0.5}>
                  Yosemite Park
                </Typography>
                <Typography level="body2">California, USA</Typography>
              </CardContent>
              <CardOverflow
                variant="soft"
                color="primary"
                sx={{
                  px: 0.2,
                  writingMode: 'vertical-rl',
                  textAlign: 'center',
                  fontSize: 'xs2',
                  fontWeight: 'xl2',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                Ticket
              </CardOverflow>
            </Card>) :
            null}
    </Page>
  );
}

export default Timetable;

