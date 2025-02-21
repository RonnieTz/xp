import React from 'react';
import AllProgramsMenuItem from './AllProgramsMenuItem';
import { tooltipTexts } from '../tooltips';

const items = [
  {
    title: 'Windows Media Player',
    icon: '/Windows Media Player.png',
    description: tooltipTexts.windowsMediaPlayer,
  },
  {
    title: 'Volume Control',
    icon: '/Volume Level.png',
    description: tooltipTexts.volumeControl,
  },
  {
    title: 'Sound Recorder',
    icon: '/Volume.png',
    description: tooltipTexts.soundRecorder,
  },
];

export default function EntertainmentSubmenu() {
  return (
    <>
      {items.map((item, index) => (
        <AllProgramsMenuItem key={index} {...item} />
      ))}
    </>
  );
}
