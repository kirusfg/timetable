import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'

import Schedule from '../../../types/Schedule'
import Section from '../../../types/Section'
import Course from '../../../types/Course'
import SectionGroup from '../../../types/SectionGroup'

interface TimetableState {
  sectionGroups: SectionGroup[]
  schedule: Schedule
}

const initialState: TimetableState = {
  sectionGroups: [],
  schedule: {
    courses: [],
    sections: [],
  },
}

export const timetableSlice = createSlice({
  name: 'timetable',
  initialState,
  reducers: {
    groupSections: (state, action: PayloadAction<Section[]>) => {
      let sections = action.payload
      let sectionGroups: SectionGroup[] = []

      let groups = new Set<any>()
      sections.forEach(({ type, course, instance }) => {
        groups.add({ type, course, instance })
      })
      groups.forEach(({ type, course, instance }) => {
        sectionGroups.push({ type, course, instance, sections: [] })
      })
      sections.forEach((section) => {
        let sectionGroupIndex = sectionGroups.findIndex(
          (sectionGroup) =>
            sectionGroup.course === section.course &&
            sectionGroup.type === section.type &&
            sectionGroup.instance === section.instance
        )
        sectionGroups[sectionGroupIndex].sections.push(section)
      })

      state.sectionGroups = sectionGroups
    },
    chooseCourse: (state, action: PayloadAction<Course>) => {
      state.schedule.courses.push(action.payload)
    },
    removeCourse: (state, action: PayloadAction<Course>) => {
      state.schedule.courses = state.schedule.courses.filter(
        (course) => course !== action.payload
      )
    },
    chooseSection: (state, action: PayloadAction<Section>) => {
      state.schedule.sections.push(action.payload)
    },
    removeSection: (state, action: PayloadAction<Section>) => {
      state.schedule.sections = state.schedule.sections.filter(
        (section) => section !== action.payload
      )
    },
  },
})

export const {
  groupSections,
  chooseCourse,
  removeCourse,
  chooseSection,
  removeSection,
} = timetableSlice.actions

export const selectSectionGroups = (state: RootState): SectionGroup[] =>
  state.timetable.sectionGroups
export const selectSchedule = (state: RootState): Schedule =>
  state.timetable.schedule
export const selectScheduleCourses = (state: RootState): Course[] =>
  state.timetable.schedule.courses
export const selectScheduleSections = (state: RootState): Section[] =>
  state.timetable.schedule.sections
