import { useAppSelector } from './reduxHooks';
import { useEntities } from './useEntities';

export const useOpenSelectedEntities = () => {
  const { handleDoubleClickEntity } = useEntities();
  const entities = useAppSelector((state) => state.fileSystem.entities);
  const selectedEntityIds = useAppSelector(
    (state) => state.fileSystem.selectedEntityIds
  );

  const handleEnter = () => {
    selectedEntityIds.forEach((id) => {
      const entity = entities.find((ent) => ent.id === id);
      if (!entity) return;

      if (entity.type === 'shortcut') {
        const target = entities.find(
          (ent) => ent.id === (entity as any).targetId
        );
        if (target && 'windowId' in target) {
          handleDoubleClickEntity(target.id);
        }
      } else if ('windowId' in entity) {
        handleDoubleClickEntity(entity.id);
      }
    });
  };

  return { handleEnter };
};
