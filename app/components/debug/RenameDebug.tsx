import { useState, useRef, useEffect } from 'react';

const RenameDebug = () => {
  const [value, setValue] = useState('Test Rename');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const tempSpan = document.createElement('span');
      tempSpan.style.font = window.getComputedStyle(inputRef.current).font;
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      tempSpan.style.whiteSpace = 'nowrap';
      tempSpan.innerText = value;

      document.body.appendChild(tempSpan);
      const textWidth = tempSpan.offsetWidth;
      document.body.removeChild(tempSpan);

      const paddingWidth = 16;
      const calculatedWidth = Math.min(
        Math.max(textWidth + paddingWidth, 1),
        120
      );

      inputRef.current.style.width = `${calculatedWidth}px`;
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input value changing to:', e.target.value);
    setValue(e.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Rename Debug</h3>
      <p>Current value: "{value}"</p>
      <input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        style={{
          minWidth: '1px',
          border: '1px solid blue',
          padding: '4px',
          fontSize: '12px',
        }}
      />
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => setValue('Reset Value')}>Reset</button>
      </div>
    </div>
  );
};

export default RenameDebug;
