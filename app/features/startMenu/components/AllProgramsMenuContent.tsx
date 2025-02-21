import React from 'react';
import AllProgramsMenuItem, {
  AllProgramsMenuItemProps,
} from './AllProgramsMenuItem';
import HorizontalDivider from './HorizontalDivider';
import AccessoriesSubmenu from './AccessoriesSubmenu';
import GamesSubmenu from './GamesSubmenu';
import { tooltipTexts } from '../tooltips';

type Item =
  | { type: 'menu'; props: AllProgramsMenuItemProps }
  | { type: 'divider' };

const items: Item[] = [
  {
    type: 'menu',
    props: {
      title: 'Set Programs Access and Defaults',
      icon: '/Default Programs.png',
      description: tooltipTexts.programsAccess,
    },
  },
  {
    type: 'menu',
    props: {
      title: 'Windows Catalog',
      icon: '/Windows Catalog.png',
      description: tooltipTexts.catalog,
    },
  },
  {
    type: 'menu',
    props: {
      title: 'Windows Update',
      icon: '/Windows Update.png',
      description: tooltipTexts.windowsUpdate,
    },
  },
  { type: 'divider' },
  {
    type: 'menu',
    props: {
      title: 'Accessories',
      icon: '/Start menu Programs.png',
      triangle: true,
      children: <AccessoriesSubmenu />,
    },
  },
  {
    type: 'menu',
    props: {
      title: 'Games',
      icon: '/Start menu Programs.png',
      triangle: true,
      children: <GamesSubmenu />,
    },
  },
  {
    type: 'menu',
    props: {
      title: 'Startup',
      icon: '/Start menu Programs.png',
      triangle: true,
    },
  },
  {
    type: 'menu',
    props: {
      title: 'Internet Explorer',
      icon: '/Internet Explorer.png',
      description: tooltipTexts.intenetExplorer,
    },
  },
  {
    type: 'menu',
    props: { title: 'MSN', icon: '/MSN.png', description: tooltipTexts.msn },
  },
  {
    type: 'menu',
    props: {
      title: 'Windows Media Player',
      icon: '/Windows Media Player.png',
      description: tooltipTexts.windowsMediaPlayer,
    },
  },
  {
    type: 'menu',
    props: {
      title: 'Outlook Express',
      icon: '/Outlook Express.png',
      description: tooltipTexts.email,
    },
  },
  {
    type: 'menu',
    props: {
      title: 'Remote Assistance',
      icon: '/Remote Assistance.png',
      description: tooltipTexts.remoteAssistance,
    },
  },
  {
    type: 'menu',
    props: {
      title: 'Windows Messenger',
      icon: '/Windows Messenger.png',
      description: tooltipTexts.messenger,
    },
  },
  {
    type: 'menu',
    props: {
      title: 'Windows Movie Maker',
      icon: '/Windows Movie Maker.png',
      description: tooltipTexts.movieMaker,
    },
  },
];

export default function AllProgramsMenuContent() {
  return (
    <>
      {items.map((item, index) => {
        if (item.type === 'divider') {
          return <HorizontalDivider key={index} />;
        }
        return <AllProgramsMenuItem key={index} {...item.props} />;
      })}
    </>
  );
}
