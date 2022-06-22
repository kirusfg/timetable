import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import Section from "../../../types/Section";


interface DayProps {
  day: string;
  sections?: Section[];
}

const Day: React.FC<DayProps> = (props) => {
  let { day, sections } = props;

  return (
    <Box
      sx={{
        width: "calc(100% / 6)",
        height: "auto",
      }}
    >
      <Typography variant="h5">{day}</Typography>
      <Box
        sx={{
          height: "auto",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            bgcolor: "grey.200",
          }}
        >
          Sections
        </Paper>
      </Box>
    </Box>
  );
};

export default Day;
