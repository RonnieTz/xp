import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks/reduxHooks';
import { openModal, closeWindow, closeParentModals } from '../windowsSlice';
import { v4 as uuidv4 } from 'uuid';

export function useModalWindow() {
  const dispatch = useAppDispatch();
  const windows = useAppSelector((state) => state.windows.windows);
  const focusedWindowId = useAppSelector(
    (state) => state.windows.focusedWindow
  );

  const showModal = useCallback(
    (options: {
      parentId?: string;
      title: string;
      size?: { width: number; height: number };
      iconPath?: any;
      id?: string;
      entityId?: string;
    }) => {
      const { parentId, title, size, iconPath, id, entityId } = options;

      // Use provided parentId or current focused window
      const parentWindowId = parentId || focusedWindowId;

      if (!parentWindowId) {
        console.error(
          'Cannot open modal: No parent window specified or focused'
        );
        return null;
      }

      // Generate a unique ID for this modal if not provided
      const modalId = id || `modal_${uuidv4()}`;

      dispatch(
        openModal({
          id: modalId,
          parentId: parentWindowId,
          title,
          size,
          iconPath,
          entityId,
        })
      );

      return modalId;
    },
    [dispatch, focusedWindowId]
  );

  const closeModal = useCallback(
    (modalId: string) => {
      dispatch(closeWindow(modalId));
    },
    [dispatch]
  );

  const closeAllModals = useCallback(
    (parentId: string) => {
      dispatch(closeParentModals(parentId));
    },
    [dispatch]
  );

  const getActiveModals = useCallback(
    (parentId: string) => {
      return windows.filter(
        (w) => w.isModal && w.parentId === parentId && w.isOpen
      );
    },
    [windows]
  );

  const hasActiveModals = useCallback(
    (parentId: string) => {
      return getActiveModals(parentId).length > 0;
    },
    [getActiveModals]
  );

  return {
    showModal,
    closeModal,
    closeAllModals,
    getActiveModals,
    hasActiveModals,
  };
}
