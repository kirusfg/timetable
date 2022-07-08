import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";


interface PageProps {
  children?: React.ReactNode;
}

const Page = (props: PageProps) => {
  const { children } = props;

  return (
    <>
      <Box sx={{
        width: "100%",
        bgcolor: "grey.100",
        height: "100%",
        maxHeight: "100%",
      }}>
        <Stack sx={{ height: "100vh", maxHeight: "100vh", display: "flex" }}>
          {children}
        </Stack>
      </Box>
    </>
  );
}

export default Page;
