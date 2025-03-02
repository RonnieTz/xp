import { useAppDispatch, useAppSelector } from './reduxHooks';
import { openWindow } from '../features/windows/windowsSlice';
import { addTask } from '../features/tasks/tasksSlice';

export const useOpenSelectedEntities = () => {
  const dispatch = useAppDispatch();
  const entities = useAppSelector((state) => state.fileSystem.entities);
  const selectedEntityIds = useAppSelector(
    (state) => state.fileSystem.selectedEntityIds
  );

  const handleEnter = () => {
    selectedEntityIds.forEach((id) => {
      const entity = entities.find((ent) => ent.id === id);
      if (!entity) return;

      if (entity.type === 'shortcut') {
        // Resolve the shortcut's target entity
        const target = entities.find(
          (ent) => ent.id === (entity as any).targetId
        );
        if (target && 'windowId' in target) {
          dispatch(openWindow(target.windowId));
          dispatch(addTask(target.windowId));
        }
      } else if ('windowId' in entity) {
        dispatch(openWindow(entity.windowId));
        dispatch(addTask(entity.windowId));
      }
    });
  };

  return { handleEnter };
};
