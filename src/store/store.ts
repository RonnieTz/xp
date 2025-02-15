import { configureStore } from '@reduxjs/toolkit';
import sampleReducer from '../features/sample/sampleSlice';

// ...existing code or import reducers...
export const store = configureStore({
  reducer: {
    sample: sampleReducer,
    // e.g., yourReducer: yourReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
