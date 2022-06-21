import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';


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
        bgcolor: 'grey.100',
      }}>
        <Stack>
          <Box sx={{
            bgcolor: 'background.paper',
            padding: 4,
          }}>
            <h1>{title}</h1>
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
