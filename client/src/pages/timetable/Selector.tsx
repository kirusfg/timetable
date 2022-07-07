import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


import Page from "../Page";
import Selector from "../../components/timetable/selector/Selector";
import SelectedCoursesList from
  "../../components/timetable/selector/SelectedCoursesList";


const SelectorPage = () => {
  return (
    <Page title="Choose Courses">
      <Stack
        sx={{ height: "100%" }}
        direction="row"
        spacing={4}
      >
        <Stack
          sx={{
            minWidth: "240px",
            maxWidth: "240px",
          }}
          direction="column"
          spacing={2}
        >
          <Typography variant="h6">
            Chosen courses
          </Typography>
          <SelectedCoursesList />
        </Stack>
        <Selector />
      </Stack>
    </Page>
  );
}

export default SelectorPage;
