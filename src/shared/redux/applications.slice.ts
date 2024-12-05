import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Application } from "./application.slice";
import { dropApplication, fetchApplications } from "../services/application.service";

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

export const dropApplicationAsync = createAsyncThunk(
  "applications/dropApplicationAsync",
  async (applicationId: number) => {
    const response = await dropApplication(applicationId);
    if (response.status === 204) {
      return {
        applicationId : applicationId,
      };
    }
    return {
      applicationId : "",
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

    builder.addCase(dropApplicationAsync.pending, (state) => {
      state.isLoading = true;
      state.loadingFailed = false;
    });
    builder.addCase(dropApplicationAsync.fulfilled, (state, action) => {
      state.applications = {...state, ...state.applications.filter((a) => a.applicationId === action.payload.applicationId)};
      state.isLoading = false;
      state.loadingFailed = false;
    });
    builder.addCase(dropApplicationAsync.rejected, (state) => {
      state.applications = [];
      state.isLoading = false;
      state.loadingFailed = true;
    });
  },
});

export const { setApplications } = applicationsSlice.actions;

export default applicationsSlice.reducer;
