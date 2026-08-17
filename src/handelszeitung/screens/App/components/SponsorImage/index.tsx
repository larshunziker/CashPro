import classNames from 'classnames';
import sponsorImageFactory from '../../../../../common/components/SponsorImage/factory';
import { STYLE_SCALEH_120 } from '../../../../../shared/constants/images';
import styles from './styles.legacy.css';

export const SPONSOR_IMAGE_POSITION_DEFAULT = 'Image';
export const SPONSOR_IMAGE_POSITION_CENTER = 'ImageCenter';
export const SPONSOR_IMAGE_POSITION_TOP_RIGHT = 'ImageTopRight';
export const SPONSOR_IMAGE_POSITION_INLINE = 'ImageInline';
export const SPONSOR_IMAGE_POSITION_AUTO = 'ImageAuto';

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
    case SPONSOR_IMAGE_POSITION_AUTO:
      return styles.ImageAutoWidth;
    default:
      return styles.Image;
  }
};

const SponsorImage = ({ position = '' }) =>
  sponsorImageFactory({
    imageStyles: { style_320: STYLE_SCALEH_120 },
    styles: {
      Wrapper: styles.Wrapper,
      Image: classNames(styles.ObjectFit, positionStyle(position)),
    },
  });

export default SponsorImage;
