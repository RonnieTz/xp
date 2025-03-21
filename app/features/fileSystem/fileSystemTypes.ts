import { StaticImageData } from 'next/image';
import foldericon from '@/public/Folder Closed.png';

export type EntityType = 'file' | 'application' | 'shortcut' | 'folder';

// Position interface for drag & drop
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
  isRenaming: boolean; // added isRenaming property for rename mode
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
  showAddressBar: boolean;
  showStandardButtons: boolean;
}

export type Entity =
  | FileEntity
  | ApplicationEntity
  | ShortcutEntity
  | FolderEntity;

export interface FileSystemState {
  entities: Entity[];
  selectedEntityIds: string[];
  folderOptions: {
    openInSameWindow: boolean;
    showCommonTasks: boolean;
    isSingleClick: boolean;
    underlineOption: 'browser' | 'hover';
  };
  clipboard: string[];
}

export const initialState: FileSystemState = {
  entities: [
    {
      id: '1',
      name: 'folder1',
      type: 'folder',
      position: {
        x: 0,
        y: 0,
      },
      folderId: 'root',
      iconPath: foldericon,
      windowId: 'folder1Window',
      children: [],
      createdDate: '2023-01-01T00:00:00.000Z',
      modifiedDate: '2023-01-01T00:00:00.000Z',
      showAddressBar: true,
      showStandardButtons: true,
      isRenaming: false,
    },
    {
      id: '2',
      name: 'folder2',
      type: 'folder',
      position: {
        x: 0,
        y: 160,
      },
      folderId: '1',
      iconPath: foldericon,
      windowId: 'folder2Window',
      children: [],
      createdDate: '2023-01-01T00:00:00.000Z',
      modifiedDate: '2023-01-01T00:00:00.000Z',
      showAddressBar: true,
      showStandardButtons: true,
      isRenaming: false,
    },
    {
      id: '3',
      name: 'folder3',
      type: 'folder',
      position: {
        x: 0,
        y: 160,
      },
      folderId: '1',
      iconPath: foldericon,
      windowId: 'folder3Window',
      children: [],
      createdDate: '2023-01-01T00:00:00.000Z',
      modifiedDate: '2023-01-01T00:00:00.000Z',
      showAddressBar: true,
      showStandardButtons: true,
      isRenaming: false,
    },
    {
      id: '4',
      name: 'folder4',
      type: 'folder',
      position: {
        x: 0,
        y: 80,
      },
      folderId: '3',
      iconPath: foldericon,
      windowId: 'folder4Window',
      children: [],
      createdDate: '2023-01-01T00:00:00.000Z',
      modifiedDate: '2023-01-01T00:00:00.000Z',
      showAddressBar: true,
      showStandardButtons: true,
      isRenaming: false,
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
      targetId: '1',
      createdDate: '2023-01-01T00:00:00.000Z',
      modifiedDate: '2023-01-01T00:00:00.000Z',
      isRenaming: false,
    },
  ],
  selectedEntityIds: [],
  folderOptions: {
    openInSameWindow: true,
    showCommonTasks: true,
    isSingleClick: false,
    underlineOption: 'browser',
  },
  clipboard: [],
};
