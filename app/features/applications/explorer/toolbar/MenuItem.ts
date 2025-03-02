import { StaticImageData } from 'next/image';

export interface MenuItem {
  label?: string;
  hasDot?: boolean;
  hasTick?: boolean;
  hasSubmenu?: boolean;
  isDivider?: boolean;
  shortcut?: string;
  disabled?: boolean;
  icon?: StaticImageData;
  expandItems?: MenuItem[];
}

export default MenuItem;
