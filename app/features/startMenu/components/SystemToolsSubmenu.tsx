import React from 'react';
import AllProgramsMenuItem from './AllProgramsMenuItem';
import { tooltipTexts } from '../tooltips';

export default function SystemToolsSubmenu() {
  return (
    <>
      <AllProgramsMenuItem
        title="Backup"
        icon="/Backup Wizard.png"
        description={tooltipTexts.backup}
      />
      <AllProgramsMenuItem
        title="Character Map"
        icon="/Charmap.png"
        description={tooltipTexts.characterMap}
      />
      <AllProgramsMenuItem
        title="Disk Cleanup"
        icon="/Disk Cleanup.png"
        description={tooltipTexts.diskCleanup}
      />
      <AllProgramsMenuItem
        title="Disk Defragmenter"
        icon="/Disk Defragmenter.png"
        description={tooltipTexts.diskDefragmenter}
      />
      <AllProgramsMenuItem
        title="File and Settings Transfer Wizard"
        icon="/File and Settings Transfer Wizard.png"
        description={tooltipTexts.filesAndSettingsTransferWizard}
      />
      <AllProgramsMenuItem
        title="Scheduled Tasks"
        icon="/Scheduled Tasks.png"
        description={tooltipTexts.scheduledTasks}
      />
      <AllProgramsMenuItem
        title="Security Center"
        icon="/Security Center.png"
        description={tooltipTexts.securityCenter}
      />
      <AllProgramsMenuItem
        title="System Information"
        icon="/System Information.png"
        description={tooltipTexts.systemInformation}
      />
      <AllProgramsMenuItem
        title="System Restore"
        icon="/System Restore.png"
        description={tooltipTexts.systemRestore}
      />
    </>
  );
}
