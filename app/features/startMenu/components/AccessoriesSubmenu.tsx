import React from 'react';
import AllProgramsMenuItem from './AllProgramsMenuItem';
import AccessibilitySubmenu from './AccessibilitySubmenu';
import CommunicationsSubmenu from './CommunicationsSubmenu';
import EntertainmentSubmenu from './EntertainmentSubmenu';
import SystemToolsSubmenu from './SystemToolsSubmenu';
import { tooltipTexts } from '../tooltips';

const items = [
  {
    triangle: true,
    title: 'Accessibility',
    icon: '/Start menu Programs.png',
    children: <AccessibilitySubmenu />,
  },
  {
    triangle: true,
    title: 'Communication',
    icon: '/Start menu Programs.png',
    children: <CommunicationsSubmenu />,
  },
  {
    triangle: true,
    title: 'Entertainment',
    icon: '/Start menu Programs.png',
    children: <EntertainmentSubmenu />,
  },
  {
    triangle: true,
    title: 'System Tools',
    icon: '/Start menu Programs.png',
    children: <SystemToolsSubmenu />,
  },
  {
    title: 'Address Book',
    icon: '/Address Book.png',
    description: tooltipTexts.addressBook,
  },
  {
    title: 'Calculator',
    icon: '/Calculator.png',
    description: tooltipTexts.calculator,
  },
  {
    title: 'Command Prompt',
    icon: '/Command Prompt.png',
    description: tooltipTexts.commandPromt,
  },
  { title: 'Notepad', icon: '/Notepad.png', description: tooltipTexts.notepad },
  {
    title: 'Program Compatibility Wizard',
    icon: '/Help and Support.png',
    description: tooltipTexts.programCompatibilityWizard,
  },
  {
    title: 'Synchronize',
    icon: '/Synchronize.png',
    description: tooltipTexts.synchronize,
  },
  {
    title: 'Tour Windows XP',
    icon: '/Tour XP.png',
    description: tooltipTexts.tourXP,
  },
  {
    title: 'Windows Explorer',
    icon: '/Explorer.png',
    description: tooltipTexts.windowsExplorer,
  },
  { title: 'Wordpad', icon: '/Wordpad.png', description: tooltipTexts.wordpad },
];

export default function AccessoriesSubmenu() {
  return (
    <>
      {items.map((item, index) => (
        <AllProgramsMenuItem key={index} {...item} />
      ))}
    </>
  );
}
