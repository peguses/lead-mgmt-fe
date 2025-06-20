import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../services/users.service";
import { User } from "../interfaces/user.interface";

export interface Users {

    isLoading: boolean,
    loadingFailed: boolean,
    users: User[],
    pagination: any

}

export interface UsersQuery {

    page: number;
    limit: number;
    key?: string;
    value?: any;
    role?: string;

}

const INITIAL_STATE: Users = {

    isLoading: false,
    loadingFailed: false,
    users: [],
    pagination: undefined

};

export const fetchUsersAsync = createAsyncThunk(
    "users/fetchUsers",
    async ({ page, limit, key, value, role }: UsersQuery) => {
      const response = await fetchUsers({page, limit, key, value, role});
      return {
        users: response.data as any,
      };
    }
  );

export const userSlice = createSlice({
    name: "users",
    initialState: INITIAL_STATE,
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(fetchUsersAsync.pending, (state) => {
        state.isLoading = true;
        state.loadingFailed = false;
      });
      builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload.users.data
        state.isLoading = false;
        state.loadingFailed = false;
        state.pagination = action.payload.users.pagination;
      });
      builder.addCase(fetchUsersAsync.rejected, (state) => {
        state.users = [];
        state.isLoading = false;
        state.loadingFailed = true;
      });
    },
});

export default userSlice.reducer;