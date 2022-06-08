import Stack from '@mui/material/Stack';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';


const App = () => {
  return (
    <>
      <Stack direction='row'>
        <Navbar />
        <Outlet />
      </Stack>
    </>
  );
}

export default App;
