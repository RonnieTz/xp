import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TasksState {
  tasks: string[]; // taskId === windowId
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      // add task if not exists
      if (!state.tasks.includes(action.payload)) {
        state.tasks.push(action.payload);
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      // remove task
      state.tasks = state.tasks.filter((id) => id !== action.payload);
    },
  },
});

export const { addTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
