import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState, WindowEntity, WindowsState } from './windowsState';

const windowsSlice = createSlice({
  name: 'windows',
  initialState, // now imported from windowsState.ts
  reducers: {
    addWindow(state, action: PayloadAction<WindowEntity>) {
      state.windows.push(action.payload);
      // Also add the new window to the order if not exists
      if (!state.windowsOrder.includes(action.payload.id)) {
        state.windowsOrder.push(action.payload.id);
      }
    },
    updateWindow(state, action: PayloadAction<WindowEntity>) {
      const index = state.windows.findIndex(
        (win) => win.id === action.payload.id
      );
      if (index >= 0) {
        state.windows[index] = action.payload;
      }
    },
    removeWindow(state, action: PayloadAction<string>) {
      state.windows = state.windows.filter((win) => win.id !== action.payload);
      // Clear focus if removed window was focused
      if (state.focusedWindow === action.payload) {
        state.focusedWindow = null;
      }
      // Remove window from order
      state.windowsOrder = state.windowsOrder.filter(
        (id) => id !== action.payload
      );
    },
    focusWindow(state, action: PayloadAction<string>) {
      state.focusedWindow = action.payload;
      // Remove if already in order then push to end to update z-index ordering
      state.windowsOrder = state.windowsOrder.filter(
        (id) => id !== action.payload
      );
      state.windowsOrder.push(action.payload);
    },
    // Optional: minimize or restore a window
    toggleMinimizeWindow(state, action: PayloadAction<string>) {
      const win = state.windows.find((win) => win.id === action.payload);
      if (win) {
        win.isMinimized = !win.isMinimized;
      }
    },
    minimizeWindow(state, action: PayloadAction<string>) {
      const win = state.windows.find((win) => win.id === action.payload);
      if (win) {
        win.isMinimized = true;
      }
    },
    openWindow(state, action: PayloadAction<string>) {
      const win = state.windows.find((win) => win.id === action.payload);
      if (win) {
        win.isOpen = true;
        win.isMinimized = false;
        state.focusedWindow = action.payload;
        state.windowsOrder = state.windowsOrder.filter(
          (id) => id !== action.payload
        );
        state.windowsOrder.push(action.payload);
      }
    },
    closeWindow(state, action: PayloadAction<string>) {
      const win = state.windows.find((win) => win.id === action.payload);
      if (win) {
        win.isOpen = false;
      }
    },
    unfocusWindow(state) {
      state.focusedWindow = null;
    },
    // New reducer to open window based on an entity's windowId
    restoreWindow(state, action: PayloadAction<string>) {
      const win = state.windows.find((win) => win.id === action.payload);
      if (win) {
        win.isMinimized = false;
      }
    },
    maximizeWindow(state, action: PayloadAction<string>) {
      const win = state.windows.find((win) => win.id === action.payload);
      if (win) {
        win.isMaximized = true;
      }
    },
    unmaximizeWindow(state, action: PayloadAction<string>) {
      const win = state.windows.find((win) => win.id === action.payload);
      if (win) {
        win.isMaximized = false;
      }
    },
  },
});

export const {
  addWindow,
  updateWindow,
  removeWindow,
  focusWindow,
  toggleMinimizeWindow,
  openWindow,
  closeWindow,
  unfocusWindow,
  minimizeWindow,
  restoreWindow,
  maximizeWindow,
  unmaximizeWindow,
} = windowsSlice.actions;
export default windowsSlice.reducer;
