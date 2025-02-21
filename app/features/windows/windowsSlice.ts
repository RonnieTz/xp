import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Size {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface WindowEntity {
  id: string;
  size: Size;
  position: Position;
  isMinimized: boolean;
  isOpen: boolean;
  iconPath: string; // added icon property to store the icon path
  entityId: string; // added property to link the window with an entity
}

interface WindowsState {
  windows: WindowEntity[];
  focusedWindow: string | null;
  windowsOrder: string[]; // replaced focusHistory with windowsOrder to track zIndex order
}

const initialState: WindowsState = {
  windows: [],
  focusedWindow: null,
  windowsOrder: [], // initial empty order
};

const windowsSlice = createSlice({
  name: 'windows',
  initialState,
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
    openWindow(state, action: PayloadAction<string>) {
      const win = state.windows.find((win) => win.id === action.payload);
      if (win) {
        win.isOpen = true;
      }
    },
    closeWindow(state, action: PayloadAction<string>) {
      const win = state.windows.find((win) => win.id === action.payload);
      if (win) {
        win.isOpen = false;
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
} = windowsSlice.actions;
export default windowsSlice.reducer;
