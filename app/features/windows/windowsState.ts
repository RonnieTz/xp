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

export interface WindowEntity {
  id: string;
  title: string;
  size: Size;
  position: Position;
  isMinimized: boolean;
  isOpen: boolean;
  iconPath: StaticImageData;
  entityId: string;
  isMaximized: boolean;
}

export interface WindowsState {
  windows: WindowEntity[];
  focusedWindow: string | null;
  windowsOrder: string[];
}

export const initialState: WindowsState = {
  windows: [
    {
      id: 'win-7',
      title: 'Window 7',
      size: { width: 800, height: 600 },
      position: { x: 610, y: 110 },
      isMinimized: false,
      isOpen: false,
      iconPath: folderIcon,
      entityId: '7',
      isMaximized: false,
    },
  ],
  focusedWindow: null,
  windowsOrder: ['win-1', 'win-2', 'win-3', 'win-4', 'win-5', 'win-6', 'win-7'],
};
