import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRoles } from "../services/roles.service";

export enum Permission {

    VIEW_USERS = "VIEW_USERS",
    VIEW_STATUS = "VIEW_STATUS",
    CREATE_USER = "CREATE_USER",
    DELETE_USER = "DELETE_USER",
    UPDATE_USER = "UPDATE_USER",
    DELETE_APPLICATION = "DELETE_APPLICATION",
    ASSIGN_APPLICATION = "ASSIGN_APPLICATION",
    VIEW_APPLICATIONS = "VIEW_APPLICATIONS",
    UPDATE_APPLICATION = "UPDATE_APPLICATION",
    UPLOAD_DOCUMENT = "UPLOAD_DOCUMENT",
    
}

export enum IRole {
    admin = "ADMIN",
    processingOfficer = "PROCESSING_OFFICER",
    referrer = "REFERRER"
}

export interface Role {
    id: number;
    name: string;
    role: IRole;
    permissions: Permission[]
}

export interface Roles {
    isLoading: boolean,
    loadingFailed: boolean,
    roles: Role[],
}

const INITIAL_STATE: Roles = {

    isLoading: false,
    loadingFailed: false,
    roles: [],

};

export const fetchRolesAsync = createAsyncThunk(
    "roles/fetchUsers",
    async () => {
      const response = await fetchRoles();
      return {
        roles: response.data.data as any,
      };
    }
  );

export const userSlice = createSlice({
    name: "roles",
    initialState: INITIAL_STATE,
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(fetchRolesAsync.pending, (state) => {
        state.isLoading = true;
        state.loadingFailed = false;
      });
      builder.addCase(fetchRolesAsync.fulfilled, (state, action) => {
        state.roles = [...action.payload.roles];
        state.isLoading = false;
        state.loadingFailed = false;
      });
      builder.addCase(fetchRolesAsync.rejected, (state) => {
        state.roles = [];
        state.isLoading = false;
        state.loadingFailed = true;
      });
    },
});

export default userSlice.reducer;