import React from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  chooseSection,
  selectSchedule,
  selectScheduleSections
} from "../../../app/store/timetable/timetableSlice";

import { useDrop } from "react-dnd";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import SectionGroup from "../../../types/SectionGroup";
import Section from "../../../types/Section";
import Day from "./Day";


const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

interface TableProps {}

const Table: React.FC<TableProps> = () => {
  const sections = useAppSelector(selectScheduleSections);

  const [, drop] = useDrop(
    () => ({
      accept: "sectionGroup",
      drop: (_item: SectionGroup) => console.log("Section chosen")
    }),
  );

  return (
    <Paper
      ref={drop}
      sx={{
        padding: 4,
        width: "100%",
        height: "auto",
      }}
    >
      <Stack direction="row" spacing={1} sx={{ height: "auto" }}>
        {days.map((day) => <Day day={day} />)}
        {sections.map((section: Section) => <h1>{section.instance}</h1>)}
      </Stack>
    </Paper>
  );
};

export default Table;
