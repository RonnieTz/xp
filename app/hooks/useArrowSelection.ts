import { useAppDispatch, useAppSelector } from './reduxHooks';
import { setSelectedEntityIds } from '../features/fileSystem/fileSystemSlice';
import { Entity } from '../features/fileSystem/fileSystemTypes';

export const useArrowSelection = () => {
  const dispatch = useAppDispatch();
  const allEntities = useAppSelector((state) =>
    state.fileSystem.entities.filter((e) => e.folderId === 'root')
  );
  const selectedEntityIds = useAppSelector(
    (state) => state.fileSystem.selectedEntityIds
  );

  const handleArrowKey = (
    direction: 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'
  ) => {
    // If nothing is selected, select the first entity if available.
    let current = allEntities.find((e) => e.id === selectedEntityIds[0]);
    if (!current && allEntities.length > 0) {
      dispatch(setSelectedEntityIds([allEntities[0].id]));
      return;
    }
    if (!current) return;

    let candidates: Entity[] = [];
    if (direction === 'ArrowDown') {
      candidates = allEntities.filter((e) => e.position.y > current.position.y);
      candidates.sort((a, b) => {
        const diffA = a.position.y - current.position.y;
        const diffB = b.position.y - current.position.y;
        return diffA === diffB
          ? Math.abs(a.position.x - current.position.x) -
              Math.abs(b.position.x - current.position.x)
          : diffA - diffB;
      });
    } else if (direction === 'ArrowUp') {
      candidates = allEntities.filter((e) => e.position.y < current.position.y);
      candidates.sort((a, b) => {
        const diffA = current.position.y - a.position.y;
        const diffB = current.position.y - b.position.y;
        return diffA === diffB
          ? Math.abs(a.position.x - current.position.x) -
              Math.abs(b.position.x - current.position.x)
          : diffA - diffB;
      });
    } else if (direction === 'ArrowRight') {
      candidates = allEntities.filter((e) => e.position.x > current.position.x);
      candidates.sort((a, b) => {
        const diffA = a.position.x - current.position.x;
        const diffB = b.position.x - current.position.x;
        return diffA === diffB
          ? Math.abs(a.position.y - current.position.y) -
              Math.abs(b.position.y - current.position.y)
          : diffA - diffB;
      });
    } else if (direction === 'ArrowLeft') {
      candidates = allEntities.filter((e) => e.position.x < current.position.x);
      candidates.sort((a, b) => {
        const diffA = current.position.x - a.position.x;
        const diffB = current.position.x - b.position.x;
        return diffA === diffB
          ? Math.abs(a.position.y - current.position.y) -
              Math.abs(b.position.y - current.position.y)
          : diffA - diffB;
      });
    }
    if (candidates.length > 0) {
      dispatch(setSelectedEntityIds([candidates[0].id]));
    }
  };

  return { handleArrowKey };
};
