import Stack from "@mui/material/Stack";

import Page from "./Page";

import Selector from "../components/timetable/selector/Selector";
import Table from "../components/timetable/table/Table";


const TimetablePage = () => {
  return (
    <Page title="Courses List">
      <Stack
        direction="row"
        spacing={4}
      >
        <Selector />
        <Table />
      </Stack>
    </Page >
  );
}

export default TimetablePage;
