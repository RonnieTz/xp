import Image, { StaticImageData } from 'next/image';
import styles from './Entity.module.css';
import shortcutIcon from '@/public/shortcut-arrow.svg';

interface EntityIconsProps {
  iconPath: StaticImageData;
  alt: string;
  dynamicImageStyle: React.CSSProperties;
  onDragStart: (e: React.DragEvent<HTMLImageElement>) => void;
  isShortcut: boolean;
}

const EntityIcons: React.FC<EntityIconsProps> = ({
  iconPath,
  alt,
  dynamicImageStyle,
  onDragStart,
  isShortcut,
}) => {
  return (
    <>
      <Image
        onDragStart={onDragStart}
        src={iconPath}
        alt={alt}
        width={40}
        height={40}
        style={dynamicImageStyle}
      />
      {isShortcut && (
        <div className={styles.shortcutIcon}>
          <Image
            style={{ rotate: '-40deg' }}
            src={shortcutIcon}
            alt="shortcut icon"
            width={8}
            height={6}
          />
        </div>
      )}
    </>
  );
};

export default EntityIcons;
