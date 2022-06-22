import React from "react";

import { useDrop } from "react-dnd";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import Section from "../../../types/Section";
import Day from "./Day";


interface TableProps {
  days?: number;
  sections?: Section[];
}

const Table: React.FC<TableProps> = (props) => {
  let { sections } = props;

  const [, drop] = useDrop(
    () => ({
      accept: "section",
      drop: () => console.log("Section added")
    }),
  );

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

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
      </Stack>
    </Paper>
  );
};

export default Table;
