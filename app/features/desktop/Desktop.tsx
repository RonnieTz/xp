'use client';
import { useEffect, useRef } from 'react';
import Taskbar from '../taskbar/components/Taskbar';
import StartMenu from '../startMenu/components/StartMenu';
import EntityComponent from '../fileSystem/Entity';
import { useEntities } from '../../hooks/useEntities';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { unfocusWindow, setDesktopSize } from '../windows/windowsSlice';
import Window from '../windows/components/Window';
import { useOpenSelectedEntities } from '../../hooks/useOpenSelectedEntities';
import { useArrowSelection } from '../../hooks/useArrowSelection';
import './Desktop.css';

export default function Desktop() {
  const {
    entities,
    clearSelections,
    handleDrop,
    handleDragOver,
    selectedEntityIds,
    setIsRenaming,
    openRemoveEntityConfirmation,
  } = useEntities();
  const { menuIsOpen } = useAppSelector((state) => state.startMenu);
  const { windows } = useAppSelector((state) => state.windows);
  const dispatch = useAppDispatch();
  const { handleEnter } = useOpenSelectedEntities();
  const { handleArrowKey } = useArrowSelection();
  const desktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      dispatch(
        setDesktopSize({
          width: desktopRef.current?.clientWidth || 0,
          height: desktopRef.current?.clientHeight || 0,
        })
      );
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  const desktopEntities = entities.filter(
    (entity) => entity.folderId === 'root'
  );

  const handleDesktopClick = () => {
    clearSelections();
    dispatch(unfocusWindow());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleEnter();
    } else if (
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight'
    ) {
      handleArrowKey(
        e.key as 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'
      );
    } else if (e.key === 'F2' && selectedEntityIds.length === 1) {
      setIsRenaming(selectedEntityIds[0], true);
    } else if (e.key === 'Delete' && selectedEntityIds.length > 0) {
      openRemoveEntityConfirmation(selectedEntityIds[0]);
    }
  };

  return (
    <div
      ref={desktopRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleDesktopClick}
      onKeyDown={handleKeyDown}
      tabIndex={0} // ensure the element is focusable
      className="desktopContainer"
    >
      {desktopEntities.map((entity) => (
        <EntityComponent key={entity.id} entity={entity} onDesktop />
      ))}
      {windows.map((win) =>
        win.isOpen ? <Window key={win.id} window={win} /> : null
      )}
      {menuIsOpen && <StartMenu />}
      <Taskbar />
    </div>
  );
}
