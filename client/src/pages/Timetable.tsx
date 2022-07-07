import Stack from "@mui/material/Stack";

import Page from "./Page";
import Table from "../components/timetable/table/Table";


const TimetablePage = () => {
  return (
    <Page title="Your Timetable">
      <Stack
        sx={{ height: "100%" }}
        direction="row"
        spacing={4}
      >
        <Table />
      </Stack>
    </Page >
  );
}

export default TimetablePage;
