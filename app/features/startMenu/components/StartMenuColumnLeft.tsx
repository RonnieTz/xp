import React from 'react';
import MenuItem from './MenuItem';
import HorizontalDivider from './HorizontalDivider'; // update relative path if HorizontalDivider remains in /src/components
import AllProgramsButton from './AllProgramsButton';
import { tooltipTexts } from '../tooltips';

export default function StartMenuColumnLeft() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 73,
        left: 0,
        width: '50%',
        height: '81%',
        padding: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        {/* ...existing left column content... */}
        <MenuItem
          icon="/Internet Explorer.png"
          title="Internet"
          subtitle="Internet Explorer"
          bold
          description={tooltipTexts.intenetExplorer}
        />
        <MenuItem
          icon="/Outlook Express.png"
          title="E-mail"
          subtitle="Outlook Express"
          bold
          description={tooltipTexts.email}
        />
        <HorizontalDivider />
        <MenuItem
          icon="/Windows Media Player.png"
          title="Windows Media Player"
          description={tooltipTexts.windowsMediaPlayer}
        />
        <MenuItem
          icon="/Windows Messenger.png"
          title="Windows Messenger"
          description={tooltipTexts.messenger}
        />
        <MenuItem
          icon="/Tour XP.png"
          title="Tour Windows XP"
          description={tooltipTexts.tourXP}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <HorizontalDivider />
        <AllProgramsButton />
      </div>
    </div>
  );
}
