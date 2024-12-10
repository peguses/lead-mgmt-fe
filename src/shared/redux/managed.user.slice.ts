import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  dropUser,
  fetchUser,
  updateUser,
} from "../services/users.service";
import { IRole } from "./role.slice";
import { User } from "../interfaces/user.interface";

export enum UserManagedAction {
  CREATE_USER = "CREATE_USER",
  UPDATE_USER = "UPDATE_USER",
  VIEW_USER = "VIEW_USER",
  DELETE_USER = "DELETE_USER",
}
export interface ManagedUser {
  isLoading: boolean;
  loadingFailed: boolean;
  user: User | undefined;
  action: UserManagedAction;
  errorMessageIfFailed: any;
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
      id: 0,
      name: "",
      role: IRole.referrer,
      permissions: [],
    },
  },
  errorMessageIfFailed: "",
  action: UserManagedAction.VIEW_USER,
};

export const fetchUserAsync = createAsyncThunk(
  "managedUser/fetchUser",
  async (userId: number) => {
    const response = await fetchUser(userId);
    return {
      user: response.data.data as any,
    };
  }
);

export const createUserAsync = createAsyncThunk(
  "managedUser/createUserAsync",
  async (data: User, { rejectWithValue }) => {
    try {
      const response = await createUser(data);
      return {
        user: response.data as any,
      };
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const dropUserAsync = createAsyncThunk(
  "managedUser/dropUserAsync",
  async (userId: number) => {
    const response = await dropUser(userId);
    return {
      user: response.data as any,
    };
  }
);

export const updateUserAsync = createAsyncThunk(
  "managedUser/updateUserAsync",
  async (data: User, { rejectWithValue }) => {
    try {
      const response = await updateUser(data.id, data);
      return {
        user: response.data as any,
      };
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const managedUserSlice = createSlice({
  name: "managedUser",
  initialState: INITIAL_STATE,
  reducers: {
    setUserManagementAction: (state, action) => {
      state.action = action.payload;
    },

    resetManagedUser: (state) => {
      state.errorMessageIfFailed = undefined;
      state.loadingFailed = false;
      state.user = undefined;
    },
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
    builder.addCase(createUserAsync.rejected, (state, action) => {
      state.user = undefined;
      state.isLoading = false;
      state.loadingFailed = true;
      state.errorMessageIfFailed = action.payload;
    });

    builder.addCase(dropUserAsync.pending, (state) => {
      state.isLoading = true;
      state.loadingFailed = false;
    });
    builder.addCase(dropUserAsync.fulfilled, (state, action) => {
      state.user = undefined;
      state.isLoading = false;
      state.loadingFailed = false;
    });
    builder.addCase(dropUserAsync.rejected, (state) => {
      state.user = undefined;
      state.isLoading = false;
      state.loadingFailed = true;
    });

    builder.addCase(updateUserAsync.pending, (state) => {
      state.isLoading = true;
      state.loadingFailed = false;
    });
    builder.addCase(updateUserAsync.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
      state.loadingFailed = false;
    });
    builder.addCase(updateUserAsync.rejected, (state, action) => {
      state.user = undefined;
      state.isLoading = false;
      state.loadingFailed = true;
      state.errorMessageIfFailed = action.payload;
    });
  },
});

export const { setUserManagementAction, resetManagedUser } =
  managedUserSlice.actions;
export default managedUserSlice.reducer;
