import React from "react";

import { useDrop } from "react-dnd";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import Section from "../../types/Section";


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

  return (
    <Box ref={drop} sx={{ width: "100%", height: "100%" }}>
      <Paper>
        Hello
      </Paper>
    </Box>
  );
};

export default Table;
