import Stack from '@mui/material/Stack';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';


interface PageProps {
  title: string;
  children?: React.ReactNode;
}

const Page = (props: PageProps) => {
  const { title, children } = props;

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
            <Typography level='h2'>{title}</Typography>
          </Box>
          <Box sx={{
            padding: 4,
          }}>
            {children}
          </Box>
        </Stack>
      </Box>
    </>
  );
}

export default Page;
