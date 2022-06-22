import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


interface PageProps {
  title: string;
  children?: React.ReactNode;
}

const Page = (props: PageProps) => {
  const { title, children } = props;

  return (
    <>
      <Box sx={{
        width: "100%",
        bgcolor: "grey.100",
      }}>
        <Stack>
          <Box sx={{
            bgcolor: "background.paper",
            padding: 4,
          }}>
            <Typography variant="h3">{title}</Typography>
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
