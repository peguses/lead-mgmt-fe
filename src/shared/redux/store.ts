import { configureStore } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import commonSlice from './common.slice';
import { persistReducer, persistStore } from 'redux-persist';
import applicantSlice from './applicant.slice';

const env = process.env.REACT_APP_ENV! as 'DEVELOPMENT' | 'PRODUCTION' | 'QA';

const commonConfig = {
  key: 'common',
  storage,
};

const applicationConfig = {
  key: 'application',
  storage,
};

const persistedCommon = persistReducer(commonConfig, commonSlice);
const persistedApplication = persistReducer(applicationConfig, applicantSlice);

export const store = configureStore({
  reducer: {
    common: persistedCommon,
    application: persistedApplication,
  },
  devTools: env === 'DEVELOPMENT' ? true : false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
