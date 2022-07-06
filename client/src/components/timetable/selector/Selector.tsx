import CircularProgress from '@mui/material/CircularProgress';
import { Button, ButtonGroup } from "@mui/material";
import Alert from '@mui/material/Alert';
import Stack from "@mui/material/Stack";
import AlertTitle from '@mui/material/AlertTitle';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams
} from '@mui/x-data-grid';

import { AppDispatch } from "../../../app/store";
import { useGetCoursesQuery, useGetSectionsQuery } from
  '../../../app/store/api/apiSlice';
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { chooseCourse, selectSchedule, selectSectionGroups } from "../../../app/store/timetable/timetableSlice";

import SectionGroup from "../../../types/SectionGroup";
import sectionTypeFull from "../../../utils/sectionTypes";
import Course from "../../../types/Course";
import Schedule from "../../../types/Schedule";


const Selector = () => {
  const dispatch = useAppDispatch();

  const {
    data: courses,
    error: coursesError,
    isLoading: coursesAreLoading
  } = useGetCoursesQuery();
  const {
    data: _sections,
    error: sectionsError,
    isLoading: sectionsAreLoading
  } = useGetSectionsQuery();
  const sectionGroups: SectionGroup[] = useAppSelector(selectSectionGroups);
  const schedule = useAppSelector(selectSchedule);

  const [rows, columns] = convertToDataGrid(
    courses,
    sectionGroups,
    schedule,
    dispatch
  );

  return (
    <Paper
      elevation={12}
      sx={{
        padding: 4,
        width: "100%",
        height: "auto",
      }}
    >
      <Stack
        sx={{
          height: "100%"
        }}
        direction="column"
        spacing={2}
      >
        <Typography variant="h5">Available Courses</Typography>

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

        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            initialState={{
              pagination: {
                pageSize: 10,
              },
            }}
            rows={rows}
            columns={columns}
          />
        </Box>
      </Stack>
    </Paper>
  );
}


const convertToDataGrid = (
  courses: Course[] | undefined,
  sectionGroups: SectionGroup[] | undefined,
  schedule: Schedule,
  dispatch: AppDispatch,
): [any[], GridColDef[]] => {
  const rows = courses
    ? courses
      .filter((course) => !schedule.courses.includes(course))
      .map((course: Course) => ({
        id: course.id,
        course: course.abbr,
        sectionTypes: sectionGroups && sectionGroups
          .filter((sectionGroup) => sectionGroup.course === course.id)
          .map((sectionGroup) => sectionGroup.type)
          .map((sectionType) => sectionTypeFull[sectionType])
          .reduce((previousValue, currentValue, currentIndex) => {
            if (currentIndex) previousValue = previousValue.concat(", ");
            return previousValue.concat(currentValue);
          }, ""),
        actions: course,
      }))
    : [];

  const columns: GridColDef[] = [
    { field: 'course', headerName: 'Course', flex: 1 },
    { field: 'sectionTypes', headerName: 'Sections', flex: 4 },
    {
      field: 'actions',
      headerName: '',
      flex: 0,
      renderCell: (params: GridRenderCellParams<Course>) =>
        params.value
          ? (
            <ButtonGroup variant="contained">
              <Button onClick={() => dispatch(chooseCourse(params.value!))}>
                Add
              </Button>
            </ButtonGroup>
          )
          : (
            <ButtonGroup variant="contained">
              <Button disabled>
                Add
              </Button>
            </ButtonGroup>
          )
    },
  ];

  return [rows, columns];
}


export default Selector;
