import Page from "../page/Page";
import PageBody from "../page/PageBody";
import PageHeader from "../page/PageHeader";

import { steps } from "./common";
import Steps from "../../components/common/Steps";

import Table from "../../components/timetable/table/Table";


const TimetablePage = () => {
  return (
    <Page>
      <PageHeader title="Timetable">
        <Steps steps={steps} activeStep={1} />
      </PageHeader>
      <PageBody>
        <Table />
      </PageBody>
    </Page >
  );
}

export default TimetablePage;
