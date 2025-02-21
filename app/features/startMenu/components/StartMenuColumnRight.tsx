import React from 'react';
import MenuItem from './MenuItem';
import HorizontalDivider from './HorizontalDivider';
import { tooltipTexts } from '../tooltips';

// Define item type
type Item =
  | { type: 'menu'; props: React.ComponentProps<typeof MenuItem> }
  | { type: 'divider' };

const items: Item[] = [
  {
    type: 'menu',
    props: {
      icon: '/My Documents.png',
      title: 'My Documents',
      bold: true,
      small: true,
      blue: true,
      description: tooltipTexts.myDocuments,
    },
  },
  {
    type: 'menu',
    props: {
      icon: '/Recent Documents.png',
      title: 'My Recent Documents',
      bold: true,
      small: true,
      blue: true,
      triangle: true,
    },
  },
  {
    type: 'menu',
    props: {
      icon: '/My Pictures.png',
      title: 'My Pictures',
      bold: true,
      small: true,
      blue: true,
      description: tooltipTexts.myPictures,
    },
  },
  {
    type: 'menu',
    props: {
      icon: '/My Music.png',
      title: 'My Music',
      bold: true,
      small: true,
      blue: true,
      description: tooltipTexts.myMusic,
    },
  },
  {
    type: 'menu',
    props: {
      icon: '/My Computer.png',
      title: 'My Computer',
      bold: true,
      small: true,
      blue: true,
      description: tooltipTexts.myComputer,
    },
  },
  { type: 'divider' },
  {
    type: 'menu',
    props: {
      icon: '/Control Panel.png',
      title: 'Control Panel',
      small: true,
      blue: true,
      description: tooltipTexts.controlPanel,
    },
  },
  {
    type: 'menu',
    props: {
      icon: '/Default Programs.png',
      title: 'Set Program Access and Defaults',
      small: true,
      blue: true,
      description: tooltipTexts.programsAccess,
    },
  },
  {
    type: 'menu',
    props: {
      icon: '/Printers and Faxes.png',
      title: 'Printers and Faxes',
      small: true,
      blue: true,
      description: tooltipTexts.printersAndFaxes,
    },
  },
  { type: 'divider' },
  {
    type: 'menu',
    props: {
      icon: '/Help and Support.png',
      title: 'Help and Support',
      small: true,
      blue: true,
      description: tooltipTexts.helpAndSupport,
    },
  },
  {
    type: 'menu',
    props: {
      icon: '/Search.png',
      title: 'Search',
      small: true,
      blue: true,
      description: tooltipTexts.search,
    },
  },
  {
    type: 'menu',
    props: {
      icon: '/Run.png',
      title: 'Run...',
      small: true,
      blue: true,
      description: tooltipTexts.run,
    },
  },
];

export default function StartMenuColumnRight() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 67,
        right: 0,
        width: '50%',
        height: '78%',
        padding: 5,
      }}
    >
      {items.map((item, index) => {
        if (item.type === 'divider') {
          return <HorizontalDivider key={index} />;
        }
        return <MenuItem key={index} {...item.props} />;
      })}
    </div>
  );
}
