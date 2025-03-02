import { configureStore } from '@reduxjs/toolkit';
import fileSystemReducer from './features/fileSystem/fileSystemSlice';

export const store = configureStore({
  reducer: {
    fileSystem: fileSystemReducer,
    // Add other reducers here as needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
