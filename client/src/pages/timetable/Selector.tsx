import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Page from "../page/Page";
import PageBody from "../page/PageBody";
import PageHeader from "../page/PageHeader";

import { steps } from "./common";
import Steps from "../../components/common/Steps";

import Selector from "../../components/timetable/selector/Selector";
import SelectedCoursesList from
  "../../components/timetable/selector/SelectedCoursesList";


const SelectorPage = () => {
  return (
    <Page>
      <PageHeader title="Timetable">
        <Steps steps={steps} activeStep={0} />
      </PageHeader>
      <PageBody>
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
      </PageBody>
    </Page>
  );
}

export default SelectorPage;
