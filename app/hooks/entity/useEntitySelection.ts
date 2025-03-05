import { useAppDispatch, useAppSelector } from '../reduxHooks';
import { setSelectedEntityIds } from '@/app/features/fileSystem/fileSystemSlice';
import { useEntityUtils } from './useEntityUtils';

export const useEntitySelection = () => {
  const dispatch = useAppDispatch();
  const { entities } = useEntityUtils();
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

  return {
    selectedEntityIds,
    clearSelections,
    selectEntity,
  };
};
