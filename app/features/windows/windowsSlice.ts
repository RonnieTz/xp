import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState, WindowEntity } from './windowsState';
import { StaticImageData } from 'next/image';

interface OpenWindowPayload {
  id: string;
  title?: string;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
  isMinimized?: boolean;
  isMaximized?: boolean;
  entityId?: string; // Add entityId to track which folder is being displayed
  iconPath?: StaticImageData;
}

interface NavigateToFolderPayload {
  windowId: string;
  folderId: string;
  folderName: string;
}

const windowsSlice = createSlice({
  name: 'windows',
  initialState,
  reducers: {
    addWindow(state, action: PayloadAction<WindowEntity>) {
      // Initialize navigation history if it doesn't exist
      const window = {
        ...action.payload,
        navigationHistory: action.payload.navigationHistory || {
          past: [],
          current: '',
          future: [],
        },
      };

      state.windows.push(window);
      // Also add the new window to the order if not exists
      if (!state.windowsOrder.includes(window.id)) {
        state.windowsOrder.push(window.id);
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
        state.focusedWindow = null;
      }
    },
    openWindow: {
      reducer(state, action: PayloadAction<OpenWindowPayload>) {
        const win = state.windows.find((win) => win.id === action.payload.id);

        if (win) {
          // Update existing window with any provided properties
          if (action.payload.position) win.position = action.payload.position;
          if (action.payload.size) win.size = action.payload.size;
          if (action.payload.title) win.title = action.payload.title;

          // Always set these properties when opening
          win.isOpen = true;
          win.isMinimized =
            action.payload.isMinimized !== undefined
              ? action.payload.isMinimized
              : false;
          win.isMaximized =
            action.payload.isMaximized !== undefined
              ? action.payload.isMaximized
              : win.isMaximized;

          // If an entityId was provided, add it to navigation history
          if (
            action.payload.entityId &&
            (!win.navigationHistory || !win.navigationHistory.current)
          ) {
            win.navigationHistory = {
              past: [],
              current: action.payload.entityId,
              future: [],
            };
          }

          // Focus the window and update z-order
          state.focusedWindow = action.payload.id;
          state.windowsOrder = state.windowsOrder.filter(
            (id) => id !== action.payload.id
          );
          state.windowsOrder.push(action.payload.id);
        } else {
          // If window doesn't exist yet, create a new one with basic properties
          const newWindow: WindowEntity = {
            id: action.payload.id,
            title: action.payload.title || action.payload.id,
            position: action.payload.position || { x: 100, y: 100 },
            size: action.payload.size || { width: 600, height: 400 },
            isOpen: true,
            isMinimized: action.payload.isMinimized || false,
            isMaximized: action.payload.isMaximized || false,
            iconPath: action.payload.iconPath!,
            entityId: action.payload.entityId || '',
            navigationHistory: {
              past: [],
              current: action.payload.entityId || '',
              future: [],
            },
          };

          state.windows.push(newWindow);
          state.focusedWindow = newWindow.id;
          state.windowsOrder.push(newWindow.id);
        }
      },
      prepare(payload: string | OpenWindowPayload) {
        if (typeof payload === 'string') {
          return { payload: { id: payload } };
        }
        return { payload };
      },
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
    // Navigate to a folder within the same window
    navigateToFolder(state, action: PayloadAction<NavigateToFolderPayload>) {
      const { windowId, folderId, folderName } = action.payload;
      const win = state.windows.find((win) => win.id === windowId);

      if (win && win.navigationHistory) {
        // Add current folder to past, clear future
        if (win.navigationHistory.current) {
          win.navigationHistory.past.push(win.navigationHistory.current);
        }
        win.navigationHistory.current = folderId;
        win.navigationHistory.future = [];

        // Update window title to the folder name
        win.title = folderName;
      }
    },

    // Navigate back in history
    navigateBack(state, action: PayloadAction<string>) {
      const windowId = action.payload;
      const win = state.windows.find((win) => win.id === windowId);

      if (
        win &&
        win.navigationHistory &&
        win.navigationHistory.past.length > 0
      ) {
        // Move current to future, take last past item as current
        const prevFolder = win.navigationHistory.past.pop();
        if (win.navigationHistory.current) {
          win.navigationHistory.future.unshift(win.navigationHistory.current);
        }

        if (prevFolder) {
          win.navigationHistory.current = prevFolder;
        }
      }
    },

    // Navigate forward in history
    navigateForward(state, action: PayloadAction<string>) {
      const windowId = action.payload;
      const win = state.windows.find((win) => win.id === windowId);

      if (
        win &&
        win.navigationHistory &&
        win.navigationHistory.future.length > 0
      ) {
        // Move current to past, take first future item as current
        const nextFolder = win.navigationHistory.future.shift();
        if (win.navigationHistory.current) {
          win.navigationHistory.past.push(win.navigationHistory.current);
        }

        if (nextFolder) {
          win.navigationHistory.current = nextFolder;
        }
      }
    },
    resetNavigationHistory: (state, action: PayloadAction<string>) => {
      const windowId = action.payload;
      const windowIndex = state.windows.findIndex((w) => w.id === windowId);

      if (windowIndex !== -1) {
        // Reset navigation history to empty state
        state.windows[windowIndex].navigationHistory = {
          current: '',
          past: [],
          future: [],
        };
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
  navigateToFolder,
  navigateBack,
  navigateForward,
  resetNavigationHistory,
} = windowsSlice.actions;
export default windowsSlice.reducer;
