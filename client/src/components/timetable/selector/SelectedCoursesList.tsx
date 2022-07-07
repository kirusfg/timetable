import React from "react";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { useAppSelector } from "../../../app/hooks";
import { selectScheduleCourses, selectSectionGroups } from "../../../app/store/timetable/timetableSlice";

import Course from '../../../types/Course';

import CourseCard from '../course/Course';
import SectionGroupCard from '../course/SectionGroup';
import SectionGroup from "../../../types/SectionGroup";


interface SelectedCoursesListProps {
  showSectionGroups?: boolean;
}


const SelectedCoursesList: React.FC<SelectedCoursesListProps> = ({ showSectionGroups }) => {
  const courses = useAppSelector(selectScheduleCourses);
  const sectionGroups = useAppSelector(selectSectionGroups);

  return (
    <List
      sx={{
        overflowY: "auto",
        overflowX: "visible",
        padding: "0.5rem 1rem 0 0.25rem",
        "& ul": { padding: 0 },
      }}
    >
      {convertCourses(courses, sectionGroups, showSectionGroups)}
    </List>
  );
}


const convertCourses = (
  courses: Course[],
  sectionGroups: SectionGroup[],
  showSections: boolean | undefined
) => {
  return courses.map((course: Course): React.ReactNode => {
    let courseSectionGroups = sectionGroups.filter(
      (sectionGroup: SectionGroup) => sectionGroup.course === course.id
    );

    let sectionGroupCards;
    if (showSections) {
      sectionGroupCards = courseSectionGroups.map(
        (sectionGroup: SectionGroup) =>
          <ListItem
            key={sectionGroup.instance + sectionGroup.type}
            sx={{ padding: 0, marginBottom: 2 }}
          >
            <SectionGroupCard sectionGroup={sectionGroup} />
          </ListItem>
      );
    }

    return (
      <>
        <ListItem
          key={course.id}
          sx={{ padding: 0, marginBottom: 2 }}
        >
          <CourseCard course={course} />
        </ListItem>
        {showSections ? sectionGroupCards : null}
      </>
    );
  });
}


export default SelectedCoursesList;
