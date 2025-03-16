import { useAppDispatch, useAppSelector } from '../reduxHooks';
import { setSelectedEntityIds } from '@/app/features/fileSystem/fileSystemSlice';
import { focusWindow } from '@/app/features/windows/windowsSlice';

export const useEntitySelection = () => {
  const dispatch = useAppDispatch();
  const { selectedEntityIds, entities } = useAppSelector(
    (state) => state.fileSystem
  );

  const clearSelections = () => dispatch(setSelectedEntityIds([]));

  // Toggle selection per entity when ctrl is pressed
  const selectEntity = (id: string, ctrlPressed: boolean) => {
    const { folderId } = entities.find((entity) => entity.id === id)!;

    if (ctrlPressed) {
      if (selectedEntityIds.includes(id)) {
        dispatch(
          setSelectedEntityIds(
            selectedEntityIds.filter((selId) => selId !== id)
          )
        );
      } else {
        dispatch(
          setSelectedEntityIds([
            ...selectedEntityIds.filter((selectedId) => {
              const { folderId: selectedFolderId } = entities.find(
                (entity) => entity.id === selectedId
              )!;
              return selectedFolderId === folderId;
            }),
            id,
          ])
        );
      }
    } else {
      dispatch(setSelectedEntityIds([id]));
    }

    if (folderId === 'root') {
      dispatch(focusWindow(''));
    }
  };

  return {
    selectedEntityIds,
    clearSelections,
    selectEntity,
  };
};
