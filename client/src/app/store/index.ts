import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { timetableSlice } from "./timetable/timetableSlice";

export const store = configureStore({
  reducer: {
    timetable: timetableSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
