import { configureStore } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import commonSlice from './common.slice';
import { persistReducer, persistStore } from 'redux-persist';

const env = process.env.REACT_APP_ENV! as 'DEVELOPMENT' | 'PRODUCTION' | 'QA';

const commonConfig = {
  key: 'common',
  storage,
};

const persistedCommon = persistReducer(commonConfig, commonSlice);

export const store = configureStore({
  reducer: {
    common: persistedCommon
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
