import { useAppDispatch, useAppSelector } from '../reduxHooks';
import {
  navigateBack,
  navigateForward,
} from '@/app/features/windows/windowsSlice';
import { useEntityUtils } from './useEntityUtils';

export const useEntityNavigation = () => {
  const dispatch = useAppDispatch();
  const { entities, windows } = useEntityUtils();

  // Back navigation handler
  const handleNavigateBack = (windowId: string) => {
    const window = windows.find((w) => w.id === windowId);
    if (!window || !window.navigationHistory?.past.length) return;

    const prevFolderId =
      window.navigationHistory.past[window.navigationHistory.past.length - 1];
    const prevFolder = entities.find((e) => e.id === prevFolderId);

    if (prevFolder) {
      dispatch(navigateBack(windowId));
    }
  };

  // Forward navigation handler
  const handleNavigateForward = (windowId: string) => {
    const window = windows.find((w) => w.id === windowId);
    if (!window || !window.navigationHistory?.future.length) return;

    const nextFolderId = window.navigationHistory.future[0];
    const nextFolder = entities.find((e) => e.id === nextFolderId);

    if (nextFolder) {
      dispatch(navigateForward(windowId));
    }
  };

  // Helper function to check if back/forward are available
  const getNavigationState = (windowId: string) => {
    const window = windows.find((w) => w.id === windowId);
    if (!window || !window.navigationHistory) {
      return { canGoBack: false, canGoForward: false };
    }

    return {
      canGoBack: window.navigationHistory.past.length > 0,
      canGoForward: window.navigationHistory.future.length > 0,
    };
  };

  return {
    handleNavigateBack,
    handleNavigateForward,
    getNavigationState,
  };
};
