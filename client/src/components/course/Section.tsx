import React from "react";

import { useDrag } from "react-dnd";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// import { ItemTypes } from "../../types/DnD";
import Section from "../../types/Section";


interface SectionCardProps {
  section: Section;
}

const SectionCard: React.FC<SectionCardProps> = (props) => {
  let { section } = props;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "section",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    })
  }));

  return (
    <Card ref={drag} sx={{ maxWidth: 200, opacity: isDragging ? 0.5 : 1 }}>
      <CardContent>
        <Typography variant="body2">
          {section.number + " " + section.type}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SectionCard;
