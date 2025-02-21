import React from 'react';
import AllProgramsMenuItem from './AllProgramsMenuItem';
import { tooltipTexts } from '../tooltips';

const items = [
  {
    title: 'Accessibility Wizard',
    icon: '/Accessibility.png',
    description: tooltipTexts.accessibilityWizard,
  },
  {
    title: 'Magnifier',
    icon: '/Magnifier.png',
    description: tooltipTexts.magnifier,
  },
  {
    title: 'Narrator',
    icon: '/Narrator.png',
    description: tooltipTexts.narrator,
  },
  {
    title: 'On-Screen Keyboard',
    icon: '/On-Screen Keyboard.png',
    description: tooltipTexts.onScreenKeyboard,
  },
  {
    title: 'Utility Manager',
    icon: '/Utility Manager.png',
    description: tooltipTexts.utilityManager,
  },
];

export default function AccessibilitySubmenu() {
  return (
    <>
      {items.map((item, index) => (
        <AllProgramsMenuItem key={index} {...item} />
      ))}
    </>
  );
}
