import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entity, FolderEntity, initialState } from './fileSystemTypes';

const fileSystemSlice = createSlice({
  name: 'fileSystem',
  initialState,
  reducers: {
    addEntity(state, action: PayloadAction<Entity>) {
      state.entities.push(action.payload);
    },
    removeEntity(state, action: PayloadAction<string>) {
      state.entities = state.entities.filter(
        (entity) => entity.id !== action.payload
      );
    },
    setIsRenaming(
      state,
      action: PayloadAction<{ id: string; isRenaming: boolean }>
    ) {
      const { id, isRenaming } = action.payload;
      const entity = state.entities.find((e) => e.id === id);

      if (entity) {
        entity.isRenaming = isRenaming;
      }
    },
    setSelectedEntityIds(state, action: PayloadAction<string[]>) {
      state.selectedEntityIds = action.payload;
    },
    // New reducer to update selection based on ctrl key
    selectEntity(
      state,
      action: PayloadAction<{ id: string; ctrlPressed: boolean }>
    ) {
      const { id, ctrlPressed } = action.payload;
      if (ctrlPressed) {
        // if entity is not already selected, add it
        if (!state.selectedEntityIds.includes(id)) {
          state.selectedEntityIds.push(id);
        }
      } else {
        // clear selection and select only clicked entity
        state.selectedEntityIds = [id];
      }
    },
    updateEntityPosition: (
      state,
      action: PayloadAction<{ id: string; x: number; y: number }>
    ) => {
      const { id, x, y } = action.payload;
      const entity = state.entities.find((e) => e.id === id);
      if (entity) {
        entity.position = { x, y };
      }
    },
    // New reducer to toggle the address bar visibility
    toggleAddressBar: (state, action: PayloadAction<string>) => {
      const folderId = action.payload;
      const folder = state.entities.find(
        (e) => e.id === folderId && e.type === 'folder'
      ) as FolderEntity | undefined;

      if (folder) {
        folder.showAddressBar = !folder.showAddressBar;
        folder.modifiedDate = new Date().toISOString();
      }
    },
    // New reducer to toggle standard buttons visibility
    toggleStandardButtons: (state, action: PayloadAction<string>) => {
      const folderId = action.payload;
      const folder = state.entities.find(
        (e) => e.id === folderId && e.type === 'folder'
      ) as FolderEntity | undefined;

      if (folder) {
        folder.showStandardButtons = !folder.showStandardButtons;
        folder.modifiedDate = new Date().toISOString();
      }
    },
    // Toggle whether folders open in new window
    setOpenInNewWindow: (state, action: PayloadAction<boolean>) => {
      state.folderOptions.openInSameWindow = action.payload;
    },

    // Toggle whether to show common tasks
    setShowCommonTasks: (state, action: PayloadAction<boolean>) => {
      state.folderOptions.showCommonTasks = action.payload;
    },

    // Toggle single-click or double-click opening mode
    setIsSingleClick: (state, action: PayloadAction<boolean>) => {
      state.folderOptions.isSingleClick = action.payload;
    },

    // Set underline option ('browser' or 'hover')
    setUnderlineOption: (state, action: PayloadAction<'browser' | 'hover'>) => {
      state.folderOptions.underlineOption = action.payload;
    },

    // Toggle both options at once (useful for resetting to defaults)
    setFolderOptions: (
      state,
      action: PayloadAction<{
        openInSameWindow: boolean;
        showCommonTasks: boolean;
        isSingleClick: boolean;
        underlineOption: 'browser' | 'hover';
      }>
    ) => {
      state.folderOptions = action.payload;
    },

    updateEntityWindowId: (
      state,
      action: PayloadAction<{ entityId: string; windowId: string }>
    ) => {
      const { entityId, windowId } = action.payload;
      const entity = state.entities.find((e) => e.id === entityId);

      if (entity && 'windowId' in entity) {
        entity.windowId = windowId;
      }
    },

    // New reducer to rename an entity
    renameEntity: (
      state,
      action: PayloadAction<{ id: string; newName: string }>
    ) => {
      const { id, newName } = action.payload;
      const entity = state.entities.find((e) => e.id === id);

      if (entity) {
        // Check if there's another entity with the same name in the same folder
        const hasDuplicate = state.entities.some(
          (e) =>
            e.id !== id && e.name === newName && e.folderId === entity.folderId
        );

        if (!hasDuplicate && newName.trim() !== '') {
          entity.name = newName;
          entity.modifiedDate = new Date().toISOString();
        }
      }
    },
    setSelections: (state, action: PayloadAction<string[]>) => {
      state.selectedEntityIds = action.payload;
    },
  },
});

export const {
  addEntity,
  removeEntity,
  setSelectedEntityIds,
  selectEntity,
  updateEntityPosition,
  toggleAddressBar,
  toggleStandardButtons,
  setOpenInNewWindow,
  setShowCommonTasks,
  setIsSingleClick,
  setUnderlineOption,
  setFolderOptions,
  updateEntityWindowId,
  renameEntity, // Export the new action
  setIsRenaming,
  setSelections,
} = fileSystemSlice.actions;
export default fileSystemSlice.reducer;
