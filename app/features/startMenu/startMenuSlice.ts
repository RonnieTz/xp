import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StartMenuState {
  menuIsOpen: boolean;
  allProgramsMenuVisible: boolean;
}

const initialState: StartMenuState = {
  menuIsOpen: false,
  allProgramsMenuVisible: false,
};

const startMenuSlice = createSlice({
  name: 'startMenu',
  initialState,
  reducers: {
    openMenu(state) {
      state.menuIsOpen = true;
    },
    closeMenu(state) {
      state.menuIsOpen = false;
    },
    toggleMenu(state) {
      state.menuIsOpen = !state.menuIsOpen;
    },
    setMenuState(state, action: PayloadAction<boolean>) {
      state.menuIsOpen = action.payload;
    },
    openAllProgramsMenu(state) {
      state.allProgramsMenuVisible = true;
    },
    closeAllProgramsMenu(state) {
      state.allProgramsMenuVisible = false;
    },
    toggleAllProgramsMenu(state) {
      state.allProgramsMenuVisible = !state.allProgramsMenuVisible;
    },
    setAllProgramsMenu(state, action: PayloadAction<boolean>) {
      state.allProgramsMenuVisible = action.payload;
    },
  },
});

export const {
  openMenu,
  closeMenu,
  toggleMenu,
  setMenuState,
  openAllProgramsMenu,
  closeAllProgramsMenu,
  toggleAllProgramsMenu,
  setAllProgramsMenu,
} = startMenuSlice.actions;
export default startMenuSlice.reducer;
