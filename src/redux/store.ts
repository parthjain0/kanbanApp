import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './projectSlice';

const store = configureStore({
  reducer: {
    posts: counterReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
