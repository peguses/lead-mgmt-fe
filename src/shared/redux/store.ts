import { configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import commonSlice from "./common.slice";
import { persistReducer, persistStore } from "redux-persist";
import applicationSlice  from "./application.slice";
import applicationsSlice from "./applications.slice";
import userSlice from "./users.slice";
import roleSlice from "./role.slice";
import managedUserSlice from "./managed.user.slice";
import applicationUserSlice from "./application.user.slice";

const env = process.env.REACT_APP_ENV! as "DEVELOPMENT" | "PRODUCTION" | "QA";

const commonConfig = {
  key: "common",
  storage,
};

const loanConfig = {
  key: "loan",
  storage,
};

const applicationsConfig = {
  key: "applications",
  storage,
};

const usersConfig = {
  key: "users",
  storage
}

const managedUserConfig = {
  key: "managedUser",
  storage
}

const applicationUserConfig = {
  key: "applicationUser",
  storage
}

const rolesConfig = {
  key: "roles",
  storage
}


const persistedCommon = persistReducer(commonConfig, commonSlice);
const persistedLoan = persistReducer(loanConfig, applicationSlice);
const persistedApplications = persistReducer(applicationsConfig, applicationsSlice);
const persistedUsers = persistReducer(usersConfig, userSlice);
const persistedManagedUser = persistReducer(managedUserConfig, managedUserSlice);
const persistedApplicationUser = persistReducer(applicationUserConfig, applicationUserSlice);
const persistedRoles = persistReducer(rolesConfig, roleSlice)

export const store = configureStore({
  reducer: {
    common: persistedCommon,
    loan: persistedLoan,
    applications: persistedApplications,
    users: persistedUsers,
    roles: persistedRoles,
    managedUser: persistedManagedUser,
    applicationUser: persistedApplicationUser
  },
  devTools: env === "DEVELOPMENT" ? true : false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
