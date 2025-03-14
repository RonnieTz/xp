import { useAppDispatch, useAppSelector } from '@/app/hooks/reduxHooks';
import Image from 'next/image';
import newWindow from '@/public/Folders open in new window.png';
import sameWindow from '@/public/Folders open in same window.png';

interface FolderOptionsState {
  openInSameWindow: boolean;
  setOpenInSameWindow: (value: boolean) => void;
}

const BrowseFolders = ({
  openInSameWindow,
  setOpenInSameWindow,
}: FolderOptionsState) => {
  const dispatch = useAppDispatch();

  return (
    <div className="tasks-options">
      <div className="tasks-options-header">Browse Folders</div>
      <div className="tasks-section">
        <Image
          src={openInSameWindow ? sameWindow : newWindow}
          alt={
            openInSameWindow
              ? 'Folders open in same window'
              : 'Folders open in new window'
          }
          width={50}
          height={50}
          className="tasks-section-icon"
          priority // Add priority to ensure image loads early
        />
        <div className="tasks-checkboxes">
          <div
            onClick={() => setOpenInSameWindow(true)}
            className="custom-checkbox-container"
          >
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={openInSameWindow}
              onChange={() => {}}
            />
            <label htmlFor="tasks">Open each folder in the same window</label>
          </div>

          <div
            onClick={() => setOpenInSameWindow(false)}
            className="custom-checkbox-container"
          >
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={!openInSameWindow}
              onChange={() => {}}
            />
            <label htmlFor="classic">Open each folder in its own window</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseFolders;
