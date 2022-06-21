import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Section from "../../types/Section";


interface SectionCardProps {
  section: Section;
}

const SectionCard: React.FC<SectionCardProps> = (props) => {
  let { section } = props;

  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardContent>
        <Typography variant="body2">
          {section.number + " " + section.type}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SectionCard;
