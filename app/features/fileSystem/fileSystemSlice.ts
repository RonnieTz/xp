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
}

export interface FileEntity extends BaseEntity {
  type: 'file';
  content: string;
}

export interface ApplicationEntity extends BaseEntity {
  type: 'application';
  executablePath: string;
}

export interface ShortcutEntity extends BaseEntity {
  type: 'shortcut';
  targetId: string;
}

export interface FolderEntity extends BaseEntity {
  type: 'folder';
  children: Entity[];
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

const initialState: FileSystemState = {
  entities: [
    {
      id: '1',
      name: 'file1',
      type: 'file',
      content: 'file1 content',
      position: { x: 0, y: 0 },
      folderId: 'root',
      iconPath: foldericon,
    },
    {
      id: '2',
      name: 'file2',
      type: 'file',
      content: 'file2 content',
      position: { x: 0, y: 0 },
      folderId: 'root',
      iconPath: foldericon,
    },
    {
      id: '3',
      name: 'app1',
      type: 'application',
      executablePath: '/app1',
      position: { x: 0, y: 0 },
      folderId: 'root',
      iconPath: foldericon,
    },
    {
      id: '4',
      name: 'app2',
      type: 'application',
      executablePath: '/app2',
      position: { x: 0, y: 0 },
      folderId: 'root',
      iconPath: foldericon,
    },
    {
      id: '5',
      name: 'shortcut1',
      type: 'shortcut',
      targetId: '1',
      position: { x: 0, y: 0 },
      folderId: 'root',
      iconPath: foldericon,
    },
    {
      id: '6',
      name: 'shortcut2',
      type: 'shortcut',
      targetId: '2',
      position: { x: 0, y: 0 },
      folderId: 'root',
      iconPath: foldericon,
    },
    {
      id: '7',
      name: 'folder1',
      type: 'folder',
      position: { x: 0, y: 0 },
      folderId: 'root',
      iconPath: foldericon,
      children: [
        {
          id: '8',
          name: 'file3',
          type: 'file',
          content: 'file3 content',
          position: { x: 0, y: 0 },
          folderId: '7',
          iconPath: foldericon,
        },
        {
          id: '9',
          name: 'file4',
          type: 'file',
          content: 'file4 content',
          position: { x: 0, y: 0 },
          folderId: '7',
          iconPath: foldericon,
        },
      ],
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
  },
});

export const { addEntity, removeEntity, setSelectedEntityIds, selectEntity } =
  fileSystemSlice.actions;
export default fileSystemSlice.reducer;
