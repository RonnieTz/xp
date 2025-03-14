import Image from 'next/image';
import commonTasks from '@/public/Folder View - Common Tasks.png';
import classic from '@/public/Folder View - Classic.png';
import { useAppSelector, useAppDispatch } from '@/app/hooks/reduxHooks';
import { setShowCommonTasks } from '../folderOptionsSlice';

interface FolderOptionsState {
  showCommonTasks: boolean;
  setShowCommonTasks: (value: boolean) => void;
}

const Tasks = ({ showCommonTasks, setShowCommonTasks }: FolderOptionsState) => {
  return (
    <div className="tasks-options">
      <div className="tasks-options-header">Tasks</div>
      <div className="tasks-section">
        <Image
          src={showCommonTasks ? commonTasks : classic}
          alt="Folder icon"
          width={50}
          height={50}
          className="tasks-section-icon"
        />
        <div className="tasks-checkboxes">
          <div
            onClick={() => setShowCommonTasks(true)}
            className="custom-checkbox-container"
          >
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={showCommonTasks}
              onChange={() => {}}
            />
            <label htmlFor="tasks">Show common tasks in folders</label>
          </div>

          <div
            onClick={() => setShowCommonTasks(false)}
            className="custom-checkbox-container"
          >
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={!showCommonTasks}
              onChange={() => {}}
            />
            <label htmlFor="classic">Use Windows classic folders</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
