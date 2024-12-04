import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, fetchUser } from "../services/users.service";
import { IRole } from "./role.slice";
import { User } from "../interfaces/user.interface";

export enum UserManagedAction {
  CREATE_USER = "CREATE_USER",
  UPDATE_USER = "UPDATE_USER",
  VIEW_USER = "VIEW_USER",
  DELETE_USER = "DELETE_USER"
}
export interface ManagedUser {

    isLoading: boolean,
    loadingFailed: boolean,
    user: User | undefined,
    action: UserManagedAction

}

const INITIAL_STATE: ManagedUser = {

    isLoading: false,
    loadingFailed: false,
    user: {
      id: 1,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: {
        name: "",
        role: IRole.referrer,
        permissions: []
      },
    },
    action: UserManagedAction.VIEW_USER

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
        setUserManagementAction: (state, action) => {
          state.action = action.payload
        }
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

export const { setUserManagementAction } = managedUserSlice.actions;
export default managedUserSlice.reducer;