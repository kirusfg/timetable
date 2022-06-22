import React from "react";

import { useDrag } from "react-dnd";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// import { ItemTypes } from "../../types/DnD";
import Section from "../../types/Section";


interface TableProps {
  sections?: Section[];
}

const Table: React.FC<TableProps> = (props) => {
  let { sections } = props;

  // const [{ isDragging }, drag] = useDrag(() => ({
  //   type: "section",
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   })
  // }));

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Paper>
        Hello
      </Paper>
    </Box>
  );
};

export default Table;
