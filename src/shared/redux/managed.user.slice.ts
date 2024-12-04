import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, fetchUser, fetchUsers } from "../services/users.service";
import { IRole } from "./role.slice";
import { User } from "../../interfaces/user.interface";

export interface ManagedUser {

    isLoading: boolean,
    loadingFailed: boolean,
    user: User | undefined,

}

const INITIAL_STATE: ManagedUser = {

    isLoading: false,
    loadingFailed: false,
    user: {
      id: 1,
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      role: {
        name: "",
        role: IRole.referrer,
        permissions: []
      },
    },

};

export const fetchUserAsync = createAsyncThunk(
    "managedUser/fetchUser",
    async (userId: number) => {
      const response = await fetchUser(userId);
      return {
        user: response.data as any,
      };
    }
);

export const createUserAsync = createAsyncThunk(
  "managedUser/createUserAsync",
  async (data: User) => {
    const response = await createUser(data);
    return {
      user: response.data as any,
    };
  }
);

export const managedUserSlice = createSlice({
    name: "managedUser",
    initialState: INITIAL_STATE,
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(fetchUserAsync.pending, (state) => {
        state.isLoading = true;
        state.loadingFailed = false;
      });
      builder.addCase(fetchUserAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.loadingFailed = false;
      });
      builder.addCase(fetchUserAsync.rejected, (state) => {
        state.user = undefined;
        state.isLoading = false;
        state.loadingFailed = true;
      });

      builder.addCase(createUserAsync.pending, (state) => {
        state.isLoading = true;
        state.loadingFailed = false;
      });
      builder.addCase(createUserAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.loadingFailed = false;
      });
      builder.addCase(createUserAsync.rejected, (state) => {
        state.user = undefined;
        state.isLoading = false;
        state.loadingFailed = true;
      });
    },
});

export default managedUserSlice.reducer;