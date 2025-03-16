import './Content.css';
import { useEntities } from '@/app/hooks/useEntities';
import EntityComponent from '@/app/features/fileSystem/Entity';
import { Fragment } from 'react';

interface ContentProps {
  folderId: string;
}

const Content = ({ folderId }: ContentProps) => {
  const { entities, clearSelections } = useEntities();
  return (
    <div onClick={clearSelections} className="content-container">
      {entities.map((entity) => (
        <Fragment key={entity.id}>
          {entity.folderId === folderId && <EntityComponent entity={entity} />}
        </Fragment>
      ))}
    </div>
  );
};

export default Content;
