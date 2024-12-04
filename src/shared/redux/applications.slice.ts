import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Application } from "./application.slice";
import { fetchApplications } from "../services/application.service";

export interface Applications {
  isLoading: boolean;
  loadingFailed: boolean;
  applications: Application[];
}

const INITIAL_STATE: Applications = {
  isLoading: false,
  loadingFailed: false,
  applications: [],
};

export const fetchApplicationsAsync = createAsyncThunk(
  "applications/fetchApplications",
  async () => {
    const response = await fetchApplications();
    return {
      applications: response.data as any,
    };
  }
);

export const applicationsSlice = createSlice({
  name: "applications",
  initialState: INITIAL_STATE,
  reducers: {
    setApplications: (state, action) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchApplicationsAsync.pending, (state) => {
      state.isLoading = true;
      state.loadingFailed = false;
    });
    builder.addCase(fetchApplicationsAsync.fulfilled, (state, action) => {
      state.applications = [...action.payload.applications];
      state.isLoading = false;
      state.loadingFailed = false;
    });
    builder.addCase(fetchApplicationsAsync.rejected, (state) => {
      state.applications = [];
      state.isLoading = false;
      state.loadingFailed = true;
    });
  },
});

export const { setApplications } = applicationsSlice.actions;

export default applicationsSlice.reducer;
