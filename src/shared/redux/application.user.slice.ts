import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../services/users.service";
import { IRole } from "./role.slice";
import { User } from "../interfaces/user.interface";

export interface ApplicationUser {

    isLoading: boolean,
    loadingFailed: boolean,
    user: User | undefined,
    loginError: string | undefined,
    authToken: string | undefined,


}

const INITIAL_STATE: ApplicationUser = {

    isLoading: false,
    loadingFailed: false,
    loginError: "",
    authToken: "",
    user: {
      id: 1,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: {
        id: 0,
        name: "",
        role: IRole.referrer,
        permissions: []
      },
    },

};

export const loginAsync = createAsyncThunk(
    "applicationUser/login",
    async (user: User) => {
      const response = await login(user);
      return {
        auth: response.data as any,
      };
    }
  );

export const managedUserSlice = createSlice({
    name: "applicationUser",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.loadingFailed = false;
      });
      builder.addCase(loginAsync.fulfilled, (state, action) => {
        state.user = action.payload.auth.data;
        state.authToken = action.payload.auth.authToken;
        state.isLoading = false;
        state.loadingFailed = false;
        state.loginError = "";
      });
      builder.addCase(loginAsync.rejected, (state, action) => {
        state.user = undefined;
        state.isLoading = false;
        state.loadingFailed = true;
        state.loginError = action.error.message;
      });
    },
});

export default managedUserSlice.reducer;