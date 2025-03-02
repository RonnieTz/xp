import { useAppDispatch, useAppSelector } from './reduxHooks';
import {
  setSelectedEntityIds,
  updateEntityPosition,
} from '../features/fileSystem/fileSystemSlice';
import { addTask } from '../features/tasks/tasksSlice';
import { openWindow } from '../features/windows/windowsSlice';

export const useEntities = () => {
  const dispatch = useAppDispatch();
  const entities = useAppSelector((state) => state.fileSystem.entities);
  const selectedEntityIds = useAppSelector(
    (state) => state.fileSystem.selectedEntityIds
  );
  const clearSelections = () => dispatch(setSelectedEntityIds([]));

  // Toggle selection per entity when ctrl is pressed
  const selectEntity = (id: string, ctrlPressed: boolean) => {
    if (ctrlPressed) {
      if (selectedEntityIds.includes(id)) {
        dispatch(
          setSelectedEntityIds(
            selectedEntityIds.filter((selId) => selId !== id)
          )
        );
      } else {
        dispatch(setSelectedEntityIds([...selectedEntityIds, id]));
      }
    } else {
      dispatch(setSelectedEntityIds([id]));
    }
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    entityId: string
  ) => {
    // If the entity is not currently selected, clear all selections and select it.
    if (!selectedEntityIds.includes(entityId)) {
      clearSelections();
      dispatch(setSelectedEntityIds([entityId]));
    }
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - left;
    const offsetY = e.clientY - top;
    const data = JSON.stringify({ primaryId: entityId, offsetX, offsetY });
    e.dataTransfer.dropEffect = 'link';
    e.dataTransfer.setData('application/entity', data);
  };

  const GRID_SIZE = 80; // grid cell size

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const dataString = e.dataTransfer.getData('application/entity');
    if (!dataString) return;
    const { primaryId, offsetX, offsetY } = JSON.parse(dataString);
    const primaryEntity = entities.find((entity) => entity.id === primaryId);
    if (!primaryEntity) return;

    // Get drop target dimensions
    const parentRect = e.currentTarget.getBoundingClientRect();

    const deltaX = e.pageX - offsetX - primaryEntity.position.x;
    const deltaY = e.pageY - offsetY - primaryEntity.position.y;
    const targetIds = selectedEntityIds.includes(primaryId)
      ? selectedEntityIds
      : [primaryId];

    // Get occupied grid positions from all entities not being moved
    const occupiedPositions = new Set(
      entities
        .filter((ent) => !targetIds.includes(ent.id))
        .map((ent) => `${ent.position.x},${ent.position.y}`)
    );

    targetIds.forEach((id) => {
      const entity = entities.find((ent) => ent.id === id);
      if (!entity) return;
      const rawX = entity.position.x + deltaX;
      const rawY = entity.position.y + deltaY;
      let newX = Math.round(rawX / GRID_SIZE) * GRID_SIZE;
      let newY = Math.round(rawY / GRID_SIZE) * GRID_SIZE;
      while (occupiedPositions.has(`${newX},${newY}`)) {
        newX += GRID_SIZE;
      }
      occupiedPositions.add(`${newX},${newY}`);

      // Clamp newX and newY within parent's dimensions
      newX = Math.min(Math.max(newX, 0), parentRect.width - GRID_SIZE);
      newY = Math.min(Math.max(newY, 0), parentRect.height - GRID_SIZE);

      dispatch(updateEntityPosition({ id, x: newX, y: newY }));
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDoubleClickEntity = (id: string) => {
    const entity = entities.find((ent) => ent.id === id);

    if (entity) {
      if ('windowId' in entity) {
        dispatch(openWindow(entity.windowId));
        dispatch(addTask(entity.windowId));
      }
    }
  };

  return {
    entities,
    clearSelections,
    selectEntity,
    handleDragStart,
    handleDrop,
    handleDragOver,
    handleDoubleClickEntity,
  };
};
