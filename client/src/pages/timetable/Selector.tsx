import Stack from "@mui/material/Stack";

import Page from "../Page";

import Selector from "../../components/timetable/Selector";
import Table from "../../components/timetable/table/Table";


const SelectorPage = () => {
  return (
    <Page title="Courses List">
      <Stack
        direction="row"
        spacing={4}
      >
        <Selector />
      </Stack>
    </Page >
  );
}

export default SelectorPage;
