import folderIcon from '@/public/Folder Closed.png';
import { StaticImageData } from 'next/image';

export interface Size {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

// Add navigation history to the WindowEntity interface

export interface WindowEntity {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  iconPath: StaticImageData;
  entityId: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  // Navigation history for folder windows
  navigationHistory: {
    past: string[]; // IDs of previously viewed folders
    current: string; // ID of the currently displayed folder
    future: string[]; // IDs of folders visited with forward button
  };
}

export interface WindowsState {
  windows: WindowEntity[];
  focusedWindow: string | null;
  windowsOrder: string[];
}

export const initialState: WindowsState = {
  windows: [
    {
      id: 'folder1Window',
      title: 'Folder 1',
      size: { width: 800, height: 600 },
      position: { x: 610, y: 110 },
      isMinimized: false,
      isOpen: false,
      iconPath: folderIcon,
      entityId: '1',
      isMaximized: false,
      navigationHistory: {
        past: [],
        current: '1',
        future: [],
      },
    },
    {
      id: 'folder2Window',
      title: 'Folder 2',
      size: { width: 800, height: 600 },
      position: { x: 510, y: 90 },
      isMinimized: false,
      isOpen: false,
      iconPath: folderIcon,
      entityId: '2',
      isMaximized: false,
      navigationHistory: {
        past: [],
        current: '2',
        future: [],
      },
    },
    {
      id: 'folder3Window',
      title: 'Folder 3',
      size: { width: 800, height: 600 },
      position: { x: 510, y: 150 },
      isMinimized: false,
      isOpen: false,
      iconPath: folderIcon,
      entityId: '3',
      isMaximized: false,
      navigationHistory: {
        past: [],
        current: '3',
        future: [],
      },
    },
    {
      id: 'folder4Window',
      title: 'Folder 4',
      size: { width: 800, height: 600 },
      position: { x: 530, y: 170 },
      isMinimized: false,
      isOpen: false,
      iconPath: folderIcon,
      entityId: '4',
      isMaximized: false,
      navigationHistory: {
        past: [],
        current: '4',
        future: [],
      },
    },
  ],
  focusedWindow: null,
  windowsOrder: [],
};
