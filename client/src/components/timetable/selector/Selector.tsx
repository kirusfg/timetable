import React from "react";

import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import {
  useGetCoursesQuery,
  useGetSectionsQuery
} from '../../../app/store/api/apiSlice';
import {useAppSelector} from "../../../app/hooks";
import {selectSectionGroups} from "../../../app/store/timetable/timetableSlice";

import Course from '../../../types/Course';
import CourseCard from '../course/Course';

import SectionGroup from "../../../types/SectionGroup";
import SectionGroupCard from '../course/SectionGroup';


const convertCourses = (courses: Course[], sectionGroups: SectionGroup[], showSections:
  boolean | undefined) => {
  return courses.map((course: Course): React.ReactNode => {
    let courseSectionGroups = sectionGroups.filter((sectionGroup: SectionGroup) =>
      sectionGroup.course === course.id
    );

    let sectionGroupCards;
    if (showSections) {
      sectionGroupCards = courseSectionGroups.map((sectionGroup: SectionGroup) =>
        <ListItem
          key={sectionGroup.instance + sectionGroup.type}
          sx={{padding: 0, marginBottom: 2}}
        >
          <SectionGroupCard sectionGroup={sectionGroup}/>
        </ListItem>
      );
    }

    return (
      <>
        <ListItem
          key={course.id}
          sx={{padding: 0, marginBottom: 2}}
        >
          <CourseCard course={course}/>
        </ListItem>
        {showSections ? sectionGroupCards : null}
      </>
    );
  });
}


const Selector = () => {
  const {
    data: courses,
    error: coursesError,
    isLoading: coursesAreLoading
  } = useGetCoursesQuery();

  const {
    data: sections,
    error: sectionsError,
    isLoading: sectionsAreLoading
  } = useGetSectionsQuery();
  const sectionGroups = useAppSelector(selectSectionGroups);

  return (
    <>
      {(coursesAreLoading || sectionsAreLoading) ?
        <CircularProgress />
        : null
      }

      {(coursesError || sectionsError) ?
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Couldn't fetch courses from the server
        </Alert>
        : null
      }

      {(courses && sections) ?
        <List
          sx={{
            position: "relative",
            overflow: "auto",
            maxHeight: "300px",
            padding: "0 14px 0 1px",
            "& ul": { padding: 0 },
          }}
        >
          {convertCourses(courses, sectionGroups, false)}
        </List>
        : null
      }
    </>
  );
}

export default Selector;
