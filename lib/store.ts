import { configureStore } from '@reduxjs/toolkit';
import appReducer from './features/appSlice';
import uiReducer from './features/uiSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
