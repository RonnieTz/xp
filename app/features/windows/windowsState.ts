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

export interface NavigationHistory {
  past: string[];
  current: string;
  future: string[];
}

export interface WindowEntity {
  id: string;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isModal?: boolean; // New flag for modal windows
  modalTarget?: string[];
  parentId?: string; // Reference to parent window id if it's a modal
  hasOpenModal?: boolean; // Flag to indicate if this window has an open modal
  iconPath: StaticImageData;
  entityId: string;
  navigationHistory: NavigationHistory;
}

export interface WindowState {
  windows: WindowEntity[];
  focusedWindow: string | null;
  windowsOrder: string[]; // To track z-index ordering
  desktopSize: Size;
}

export const initialState: WindowState = {
  windows: [
    {
      id: 'folder1Window',
      title: 'Folder 1',
      size: { width: 800, height: 600 },
      position: { x: 610, y: 110 },
      isMinimized: false,
      isOpen: false,
      hasOpenModal: false,
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
    {
      id: 'FolderOptionsWindow',
      title: 'Options',
      size: { width: 400, height: 300 },
      position: { x: 100, y: 100 },
      isMinimized: false,
      isOpen: false,
      iconPath: folderIcon,
      entityId: '100',
      isMaximized: false,
      navigationHistory: {
        past: [],
        current: '100',
        future: [],
      },
      isModal: true,
      parentId: 'folder1Window',
    },
  ],
  focusedWindow: null,
  windowsOrder: [],
  desktopSize: { width: 1920, height: 1080 },
};
