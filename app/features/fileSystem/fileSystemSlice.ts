import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import foldericon from '@/public/Folder Closed.png';
import { StaticImageData } from 'next/image';

export type EntityType = 'file' | 'application' | 'shortcut' | 'folder';

// Add a Position interface for drag & drop
export interface Position {
  x: number;
  y: number;
}

export interface BaseEntity {
  id: string;
  name: string;
  type: EntityType;
  position: Position; // added position property for desktop dragging
  folderId: string; // made folderId required
  iconPath: StaticImageData; // added iconPath property for entity icon
  // New properties to track dates
  createdDate: string;
  modifiedDate: string;
}

export interface FileEntity extends BaseEntity {
  type: 'file';
  content: string;
  windowId: string;
}

export interface ApplicationEntity extends BaseEntity {
  type: 'application';
  executablePath: string;
  windowId: string;
}

export interface ShortcutEntity extends BaseEntity {
  type: 'shortcut';
  targetId: string;
  // no windowId for shortcuts
}

export interface FolderEntity extends BaseEntity {
  type: 'folder';
  children: Entity[];
  windowId: string;
}

export type Entity =
  | FileEntity
  | ApplicationEntity
  | ShortcutEntity
  | FolderEntity;

interface FileSystemState {
  entities: Entity[];
  // New state to track selected entities by their IDs
  selectedEntityIds: string[];
}

// helper function to generate a random position between 50 and 500

const initialState: FileSystemState = {
  entities: [
    {
      id: '7',
      name: 'folder1',
      type: 'folder',
      position: {
        x: 0,
        y: 0,
      },
      folderId: 'root',
      iconPath: foldericon,
      windowId: 'win-7',
      children: [],
      createdDate: '2023-01-01T00:00:00.000Z',
      modifiedDate: '2023-01-01T00:00:00.000Z',
    },
    {
      type: 'shortcut',
      id: '8',
      name: 'shortcut1',
      position: {
        x: 0,
        y: 80,
      },
      folderId: 'root',
      iconPath: foldericon,
      targetId: '7',
      createdDate: '2023-01-01T00:00:00.000Z',
      modifiedDate: '2023-01-01T00:00:00.000Z',
    },
  ],
  // Initialize selection as empty
  selectedEntityIds: [],
};

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
  },
});

export const {
  addEntity,
  removeEntity,
  setSelectedEntityIds,
  selectEntity,
  updateEntityPosition,
} = fileSystemSlice.actions;
export default fileSystemSlice.reducer;
