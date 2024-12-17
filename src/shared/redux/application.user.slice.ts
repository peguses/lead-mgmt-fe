import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../services/users.service";
import { IRole } from "./role.slice";
import { User } from "../interfaces/user.interface";

export interface ApplicationUser {

    isLoading: boolean,
    loadingFailed: boolean,
    user: User | undefined,
    loginError: any,
    authToken: string | undefined;

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
    async (user: User, {rejectWithValue}) => {
      try {
        const response = await login(user);
        return {
          auth: response.data as any,
        };
      } catch (error: any) {
        return rejectWithValue(error.response.data.error);
      }
    }
    
);

export const logoutAsync = createAsyncThunk(
  "applicationUser/logout",
  async (_, {rejectWithValue}) => {
    try {
      const response = await logout();
      return {
        auth: response.data as any,
      };
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
  
);


export const managedUserSlice = createSlice({
    name: "applicationUser",
    initialState: INITIAL_STATE,
    reducers: {
    },
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
        state.loginError = action?.payload;
      });

      builder.addCase(logoutAsync.pending, (state) => {
        state.isLoading = true;
        state.loadingFailed = false;
      });
      builder.addCase(logoutAsync.fulfilled, (state, action) => {
        state.user = undefined;
        state.authToken = undefined;
        state.isLoading = false;
        state.loadingFailed = false;
        state.loginError = "";
      });
      builder.addCase(logoutAsync.rejected, (state, action) => {
        state.user = undefined;
        state.isLoading = false;
        state.loadingFailed = true;
        state.loginError = action?.payload;
      });
    },
});

export default managedUserSlice.reducer;