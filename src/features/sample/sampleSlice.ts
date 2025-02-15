import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 0 };

const sampleSlice = createSlice({
  name: 'sample',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, decrement, reset } = sampleSlice.actions;
export default sampleSlice.reducer;
