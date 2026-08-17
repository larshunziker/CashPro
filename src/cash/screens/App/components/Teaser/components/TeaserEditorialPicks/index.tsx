/* istanbul ignore file */

import teaserFactory from '../../../../../../../common/components/Teaser/factory';
import { getFormattedPublicationDateByProps } from '../../shared/helpers';
import { STYLE_3X2_440 } from '../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';

const TeaserEditorialPicks = teaserFactory({
  isPublicationDateVisible: true,
  isShortTitleHidden: false,
  /* @ts-ignore TODO: TS2322 ->  Type '(props */
  formattedPublicationDate: getFormattedPublicationDateByProps,
  teaserImageStyles: {
    style_320: STYLE_3X2_440,
  },
  styles: {
    Wrapper: styles.Wrapper,
    ContentWrapper: styles.ContentWrapper,
    Title: styles.TeaserTitle,
    ShortTitle: styles.ShortTitle,
    ImageWrapper: styles.TeaserImageWrapper,
    Image: styles.Image,
    BottomLine: styles.BottomLine,
  },
});

export default TeaserEditorialPicks;
