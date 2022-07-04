import Stack from "@mui/material/Stack";

import Page from "../Page";

import SelectedCoursesList from "../../components/timetable/selector/SelectedCoursesList";
import Selector from "../../components/timetable/selector/Selector";


const SelectorPage = () => {
  return (
    <Page title="Courses List">
      <Stack
        direction="row"
        spacing={4}
      >
        <Stack
          direction="row"
          spacing={4}
        >
          <h4>Selected Courses</h4>
          <SelectedCoursesList/>
        </Stack>
        <Selector/>
      </Stack>
    </Page>
  );
}

export default SelectorPage;
