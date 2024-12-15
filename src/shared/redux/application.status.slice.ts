import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchStatuses } from "../services/status.service";

export interface ApplicationStatus {
  id: number;
  status: string;
  note: string;
}

export interface ApplicationStatues {
  isLoading: boolean,
  loadingFailed: boolean,
  applicationStatuses: ApplicationStatus[],
}


const INITIAL_STATE: ApplicationStatues = {
  isLoading: false,
  loadingFailed: false,
  applicationStatuses: []
}

export const fetchStatusesAsync = createAsyncThunk(
    "applicationStatuses/fetchStatuses",
    async () => {
      const response = await fetchStatuses();
      return {
        statuses: response.data.data as any,
      };
    }
);

export const applicationStatusSlice = createSlice({
    name: "applicationStatuses",
    initialState: INITIAL_STATE,
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(fetchStatusesAsync.pending, (state) => {
        state.isLoading = true;
        state.loadingFailed = false;
      });
      builder.addCase(fetchStatusesAsync.fulfilled, (state, action) => {
        state.applicationStatuses = action.payload.statuses;
        state.isLoading = false;
        state.loadingFailed = false;
      });
      builder.addCase(fetchStatusesAsync.rejected, (state) => {
        state.applicationStatuses = [];
        state.isLoading = false;
        state.loadingFailed = true;
      });
    },
});

export default applicationStatusSlice.reducer;