import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import Page from './Page';
import {
  useGetCoursesQuery,
  useGetSectionsQuery
} from '../features/api/apiSlice';

import Course from '../types/Course';
import CourseCard from '../components/course/Course';

import Section from '../types/Section';
import SectionCard from '../components/course/Section';


const Timetable = () => {
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
    <Page title='Courses List'>
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
        (coursesData.results.map((course: Course) => {
          console.log(course.id);

          let sections = sectionsData.results.filter((section: Section) =>
            section.course === course.id
          );

          console.log(sections);

          let sectionCards = sections.map((section: Section) =>
            <SectionCard
              key={section.instance}
              section={section}
            />
          );
          return <>
            <CourseCard
              key={course.abbr}
              course={course}
            />
            {sectionCards}
          </>;
        }
        ))
        : null
      }
    </Page>
  );
}

export default Timetable;

