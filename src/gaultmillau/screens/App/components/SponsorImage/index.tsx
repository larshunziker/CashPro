import sponsorImageFactory from '../../../../../common/components/SponsorImage/factory';
import { STYLE_SCALEH_120 } from '../../../../../shared/constants/images';
import styles from './styles.legacy.css';

export const SPONSOR_IMAGE_POSITION_DEFAULT = 'Image';
export const SPONSOR_IMAGE_POSITION_CENTER = 'ImageCenter';
export const SPONSOR_IMAGE_POSITION_TOP_RIGHT = 'ImageTopRight';
export const SPONSOR_IMAGE_POSITION_INLINE = 'ImageInline';

// Different positions generate different styles for Images
const positionStyle = (position: string) => {
  if (!position) {
    return styles.Image;
  }

  switch (position) {
    case SPONSOR_IMAGE_POSITION_DEFAULT:
      return styles.Image;
    case SPONSOR_IMAGE_POSITION_CENTER:
      return styles.ImageCenter;
    case SPONSOR_IMAGE_POSITION_TOP_RIGHT:
      return styles.ImageTopRight;
    case SPONSOR_IMAGE_POSITION_INLINE:
      return styles.ImageInline;
    default:
      return styles.Image;
  }
};

const factory = ({ position = '' }) =>
  sponsorImageFactory({
    imageStyles: { style_320: STYLE_SCALEH_120 },
    styles: {
      Wrapper: styles.Wrapper,
      Image: positionStyle(position),
    },
  });

export default factory;
