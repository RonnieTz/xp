import React from 'react';
import Image from 'next/image';
import singleClick from '@/public/Single Click.png';
import doubleClick from '@/public/Double Click.png';
import { useAppSelector, useAppDispatch } from '@/app/hooks/reduxHooks';
import { setIsSingleClick, setUnderlineOption } from '../folderOptionsSlice';

type UnderlineOption = 'browser' | 'hover';
interface FolderOptionsState {
  isSingleClick: boolean;
  underlineOption: UnderlineOption;
  setIsSingleClick: (value: boolean) => void;
  setUnderlineOption: (value: UnderlineOption) => void;
}

const ClickItems = ({
  isSingleClick,
  underlineOption,
  setIsSingleClick,
  setUnderlineOption,
}: FolderOptionsState) => {
  // Helper function to manage underline option
  const handleUnderlineChange = (option: UnderlineOption) => {
    setUnderlineOption(option);
  };

  // When single click is turned on/off
  const handleSingleClickChange = (value: boolean) => {
    setIsSingleClick(value);
  };

  return (
    <div className="tasks-options">
      <div className="tasks-options-header">Click items as follows</div>
      <div className="tasks-section">
        <Image
          src={isSingleClick ? singleClick : doubleClick}
          alt="Folder icon"
          width={50}
          height={50}
          className="tasks-section-icon"
        />
        <div className="tasks-checkboxes">
          <div
            onClick={() => handleSingleClickChange(true)}
            className="custom-checkbox-container"
          >
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={isSingleClick}
              onChange={() => {}}
            />
            <label htmlFor="singleClick">
              Single-click to open an item (point to select)
            </label>
          </div>

          <div
            onClick={() => isSingleClick && handleUnderlineChange('browser')}
            style={{ marginLeft: 20 }}
            className={`custom-checkbox-container ${
              !isSingleClick ? 'disabled-checkbox-container' : ''
            }`}
          >
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={isSingleClick && underlineOption === 'browser'}
              disabled={!isSingleClick}
              onChange={() => {}}
            />
            <label
              htmlFor="underlineBrowser"
              className={!isSingleClick ? 'disabled-checkbox-label' : ''}
            >
              Underline icon titles consistent with my browser
            </label>
          </div>

          <div
            onClick={() => isSingleClick && handleUnderlineChange('hover')}
            style={{ marginLeft: 20 }}
            className={`custom-checkbox-container ${
              !isSingleClick ? 'disabled-checkbox-container' : ''
            }`}
          >
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={isSingleClick && underlineOption === 'hover'}
              disabled={!isSingleClick}
              onChange={() => {}}
            />
            <label
              htmlFor="underlineHover"
              className={!isSingleClick ? 'disabled-checkbox-label' : ''}
            >
              Underline icon titles only when I point at them
            </label>
          </div>

          <div
            onClick={() => handleSingleClickChange(false)}
            className="custom-checkbox-container"
          >
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={!isSingleClick}
              onChange={() => {}}
            />
            <label htmlFor="doubleClick">
              Double-click to open an item (single-click to select)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClickItems;
