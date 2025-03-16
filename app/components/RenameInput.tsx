import React, { useEffect, useRef, useState } from 'react';
import styles from '../features/fileSystem/Entity.module.css';

interface RenameInputProps {
  initialValue: string;
  onRename: (newValue: string) => void;
  onCancel: () => void;
  className?: string;
}

const RenameInput: React.FC<RenameInputProps> = ({
  initialValue,
  onRename,
  onCancel,
  className,
}) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialFocusPerformed = useRef(false);

  // Handle initial focus and selection only once
  useEffect(() => {
    if (inputRef.current && !initialFocusPerformed.current) {
      const input = inputRef.current;
      input.focus();
      input.setSelectionRange(
        0,
        initialValue.lastIndexOf('.') > 0
          ? initialValue.lastIndexOf('.')
          : initialValue.length
      );
      initialFocusPerformed.current = true;

      // Adjust width based on content
      adjustWidth();
    }
  }, [initialValue]);

  // Adjust width when value changes
  useEffect(() => {
    adjustWidth();
  }, [value]);

  const adjustWidth = () => {
    if (!inputRef.current) return;

    // Measure text width
    const tempSpan = document.createElement('span');
    tempSpan.style.font = window.getComputedStyle(inputRef.current).font;
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'nowrap';
    tempSpan.innerText = value || initialValue;

    document.body.appendChild(tempSpan);
    const textWidth = tempSpan.offsetWidth;
    document.body.removeChild(tempSpan);

    // Set width with padding
    const paddingWidth = 16;
    inputRef.current.style.width = `${Math.min(
      Math.max(textWidth + paddingWidth, 1),
      80
    )}px`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (e.key === 'Enter') {
      finishRename();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  const finishRename = () => {
    const trimmedValue = value.trim();
    if (trimmedValue && trimmedValue !== initialValue) {
      onRename(trimmedValue);
    } else {
      onCancel();
    }
  };

  return (
    <input
      ref={inputRef}
      className={`${styles.renameInput} ${className || ''}`}
      value={value}
      onChange={handleChange}
      onBlur={finishRename}
      onKeyDown={handleKeyDown}
      onClick={(e) => e.stopPropagation()}
      autoComplete="off"
      spellCheck={false}
    />
  );
};

export default RenameInput;
