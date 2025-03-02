import { configureStore } from '@reduxjs/toolkit';
import startMenu from '../features/startMenu/startMenuSlice';
import fileSystem from '../features/fileSystem/fileSystemSlice';
import windows from '../features/windows/windowsSlice';
import tasks from '../features/tasks/tasksSlice';

export const store = configureStore({
  reducer: {
    startMenu,
    fileSystem,
    windows,
    tasks,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
