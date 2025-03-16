import { StaticImageData } from 'next/image';
import { MouseEvent } from 'react';

export interface SidebarItem {
  title: string;
  icon: StaticImageData;
  show?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export interface SidebarProps {
  folderId: string;
}
