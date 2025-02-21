import React from 'react';
import AllProgramsMenuItem from './AllProgramsMenuItem';
import { tooltipTexts } from '../tooltips';

export default function GamesSubmenu() {
  return (
    <>
      <AllProgramsMenuItem
        title="Minesweeper"
        icon="/Minesweeper.png"
        description={tooltipTexts.minesweeper}
      />
      <AllProgramsMenuItem
        title="Solitaire"
        icon="/Solitaire.png"
        description={tooltipTexts.solitaire}
      />
      <AllProgramsMenuItem
        title="FreeCell"
        icon="/FreeCell.png"
        description={tooltipTexts.freeCell}
      />
      <AllProgramsMenuItem
        title="Hearts"
        icon="/Hearts.png"
        description={tooltipTexts.hearts}
      />
      <AllProgramsMenuItem
        title="Spider Solitaire"
        icon="/Spider Solitaire.png"
        description={tooltipTexts.spiderSolitaire}
      />
      <AllProgramsMenuItem
        title="Pinball"
        icon="/Pinball.png"
        description={tooltipTexts.pinball}
      />
    </>
  );
}
