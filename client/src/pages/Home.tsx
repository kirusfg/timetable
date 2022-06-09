import Stack from '@mui/material/Stack';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

const Home = () => {
  return (
    <>
    <Box sx={{
      width: '100%',
      bgcolor: 'background.level2',
    }}>
      <Stack>
        <Box sx={{
          bgcolor: 'background.body',
          padding: 4,
        }}>
          <Typography level='h2'>Home</Typography>
        </Box>
        <Box sx={{
          padding: 4,
        }}>
          <Typography level='body1'>Page body</Typography>
        </Box>
      </Stack>
    </Box>
    </>
  );
}

export default Home;
