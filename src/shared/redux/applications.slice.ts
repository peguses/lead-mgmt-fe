import { createSlice } from "@reduxjs/toolkit";
import { Application } from "./application.slice";

const INITIAL_STATE: Application[] = [];

export const applicationsSlice = createSlice({
    name: "applications",
    initialState: INITIAL_STATE,
    reducers: {
        setApplications: (state, action) => {
            state = action.payload;
        },
    }
});

export const {
    setApplications
  } = applicationsSlice.actions;

export default applicationsSlice.reducer;