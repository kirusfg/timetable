import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

import Schedule from "../../../types/Schedule";
import Section from "../../../types/Section";
import Course from "../../../types/Course";


interface TimetableState {
  schedule: Schedule
};


const initialState: TimetableState = {
  schedule: {
    courses: [],
    sections: [],
  }
};


export const timetableSlice = createSlice({
  name: "timetable",
  initialState,
  reducers: {
    chooseCourse: (state, action: PayloadAction<Course>) => {
      state.schedule.courses.push(action.payload);
    },
    removeCourse: (state, action: PayloadAction<Course>) => {
      state.schedule.courses = state.schedule.courses.filter(
        (course) => course !== action.payload
      );
    },
    chooseSection: (state, action: PayloadAction<Section>) => {
      state.schedule.sections.push(action.payload);
    },
    removeSection: (state, action: PayloadAction<Section>) => {
      state.schedule.sections = state.schedule.sections.filter(
        (section) => section !== action.payload
      );
    },
  }
});


export const {
  chooseCourse,
  removeCourse,
  chooseSection,
  removeSection
} = timetableSlice.actions;

export const selectSchedule = (state: RootState): Schedule =>
  state.timetable.schedule;
export const selectCourses = (state: RootState): Course[] =>
  state.timetable.schedule.courses;
export const selectSections = (state: RootState): Section[] =>
  state.timetable.schedule.sections;
