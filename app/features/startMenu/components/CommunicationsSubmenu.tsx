import React from 'react';
import AllProgramsMenuItem from './AllProgramsMenuItem';
import { tooltipTexts } from '../tooltips';

const items = [
  {
    title: 'Hyper Terminal',
    icon: '/Hyper Terminal.png',
    description: tooltipTexts.hyperTerminal,
  },
  {
    title: 'Network Connections',
    icon: '/Network Connections.png',
    description: tooltipTexts.nerworkConnections,
  },
  {
    title: 'Network Setup Wizard',
    icon: '/Network Setup.png',
    description: tooltipTexts.networkSetupWizard,
  },
  {
    title: 'New Connection Wizard',
    icon: '/New Network Connection.png',
    description: tooltipTexts.newConnectionWizard,
  },
  {
    title: 'Remote Desktop Connection',
    icon: '/Remote Desktop.png',
    description: tooltipTexts.remoteDesktopConnection,
  },
  {
    title: 'Wireless Network Setup Wizard',
    icon: '/Wireless Network Setup.png',
    description: tooltipTexts.wirelessNetworkSetupWizard,
  },
];

export default function CommunicationsSubmenu() {
  return (
    <>
      {items.map((item, index) => (
        <AllProgramsMenuItem key={index} {...item} />
      ))}
    </>
  );
}
