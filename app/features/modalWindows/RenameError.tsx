import './RenameError.css';
import Image from 'next/image';
import icon from '@/public/Critical.png';
import { useWindowManager } from '../windows/hooks/useWindowManager';
import { useEntities } from '@/app/hooks/useEntities';

interface RenameErrorProps {
  windowId: string;
  targetId: string[];
}

const RenameError = ({ windowId, targetId }: RenameErrorProps) => {
  const { selectEntity, setIsRenaming, entities } = useEntities();
  const { isFocused, close } = useWindowManager(
    windowId,
    { x: 450, y: 200 },
    { width: 400, height: 200 }
  );

  const entity = entities.find((entity) => entity.id === targetId[0]);

  return (
    <div className="rename-error-container">
      <div className="rename-error-message">
        <Image src={icon} alt="Error icon" width={40} height={40} />
        <div className="rename-error-title">
          {`Cannot rename ${entity?.name}: A file with the name you specified already
          exists. Specify a different file name.`}
        </div>
      </div>
      <div
        style={{ borderColor: isFocused ? 'black' : 'transparent' }}
        className="rename-error-button"
        onClick={() => {
          close();
          selectEntity(targetId[0], false);
          setIsRenaming(targetId[0], true);
        }}
      >
        OK
      </div>
    </div>
  );
};

export default RenameError;
