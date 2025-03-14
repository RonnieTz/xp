import React from 'react';
import './DialogButtons.css';

interface DialogButtonsProps {
  onOk?: () => void;
  onCancel?: () => void;
  onApply?: () => void;
  okLabel?: string;
  cancelLabel?: string;
  applyLabel?: string;
  disableApply?: boolean;
}

const DialogButtons: React.FC<DialogButtonsProps> = ({
  onOk,
  onCancel,
  onApply,
  okLabel = 'OK',
  cancelLabel = 'Cancel',
  applyLabel = 'Apply',
  disableApply = false,
}) => {
  return (
    <div className="dialog-buttons">
      <button className="xp-button ok-button" onClick={onOk}>
        {okLabel}
      </button>
      <button className={`xp-button cancel-button`} onClick={onCancel}>
        {cancelLabel}
      </button>

      <button
        className={`xp-button apply-button ${disableApply ? 'disabled' : ''}`}
        onClick={onApply}
        disabled={disableApply}
      >
        {applyLabel}
      </button>
    </div>
  );
};

export default DialogButtons;
