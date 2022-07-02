import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import {
  useGetCoursesQuery,
  useGetSectionsQuery
} from '../../app/store/api/apiSlice';

import Course from '../../types/Course';
import CourseCard from '../course/Course';

import Section from '../../types/Section';
import SectionCard from '../course/Section';


const convertCourses = (courses: Course[], sections: Section[]) => {
  let cards = courses.map((course: Course): React.ReactNode => {
    let courseSections = sections.filter((section: Section) =>
      section.course === course.id
    );

    let sectionCards = courseSections.map((section: Section) =>
      <ListItem
        key={
          section.instance
          + section.number.toString()
          + section.type
        }
        sx={{ padding: 0, marginBottom: 2 }}
      >
        <SectionCard section={section} />
      </ListItem >
    );

    return (
      <>
        <ListItem
          key={course.id}
          sx={{ padding: 0, marginBottom: 2 }}
        >
          <CourseCard course={course} />
        </ListItem>
        {sectionCards}
      </>
    );
  });

  return cards;
}

const Selector = () => {
  const {
    data: coursesData,
    error: coursesError,
    isLoading: coursesAreLoading
  } = useGetCoursesQuery();

  const {
    data: sectionsData,
    error: sectionsError,
    isLoading: sectionsAreLoading
  } = useGetSectionsQuery();

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

      {(coursesData && sectionsData) ?
        <List
          sx={{
            position: "relative",
            overflow: "auto",
            maxHeight: "300px",
            padding: "0 14px 0 1px",
            "& ul": { padding: 0 },
          }}
        >
          {convertCourses(coursesData.results, sectionsData.results)}
        </List>
        : null
      }
    </>
  );
}

export default Selector;
