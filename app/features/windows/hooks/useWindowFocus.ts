import { useAppSelector, useAppDispatch } from '@/app/hooks/reduxHooks';
import { useModalWindow } from './useModalWindow';
import { useCallback } from 'react';
import { focusWindow } from '../windowsSlice';

export const useWindowFocus = (windowId: string) => {
  const dispatch = useAppDispatch();
  const { windows } = useAppSelector((state) => state.windows);
  const childModalWindows = windows.filter(
    (w) => w.isModal && w.parentId === windowId && w.isOpen
  );
  const { hasActiveModals } = useModalWindow();

  const activeModalId =
    childModalWindows.length > 0
      ? childModalWindows[childModalWindows.length - 1].id
      : null;

  const focusActiveModal = useCallback(() => {
    if (activeModalId) {
      setTimeout(() => {
        dispatch(focusWindow(activeModalId));
      }, 100);
      setTimeout(() => {
        dispatch(focusWindow(''));
      }, 200);
      setTimeout(() => {
        dispatch(focusWindow(activeModalId));
      }, 300);
      setTimeout(() => {
        dispatch(focusWindow(''));
      }, 400);
      setTimeout(() => {
        dispatch(focusWindow(activeModalId));
      }, 500);

      return true;
    }
    return false;
  }, [dispatch, activeModalId]);

  const focus = (windowId: string) => {
    const window = windows.find((w) => w.id === windowId);
    const isModal = window?.isModal || false;
    const parentId = window?.parentId;
    const hasOpenModal = window?.hasOpenModal || false;
    // If this window has an open modal, focus that modal instead
    if (hasOpenModal && focusActiveModal()) {
      return;
    }

    // Only allow focusing if no parent window has an active modal
    // If this is a modal window, it can always be focused
    if (isModal || !parentId) {
      dispatch(focusWindow(windowId));
    } else {
      const parentHasActiveModals = hasActiveModals(parentId);
      if (!parentHasActiveModals) {
        dispatch(focusWindow(windowId));
      }
    }
  };
  return { focus };
};
