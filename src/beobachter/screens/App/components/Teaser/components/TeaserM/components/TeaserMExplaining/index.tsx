import classNames from 'classnames';
import teaserFactory from '../../../../../../../../../common/components/Teaser/factory';
import {
  STYLE_16X9_280,
  STYLE_16X9_440,
  STYLE_3X2_210,
  STYLE_3X2_280,
} from '../../../../../../../../../shared/constants/images';
import { TEASER_M_EXPLAINING_IDENTIFIER } from '../../../../constants';
import styles from './styles.legacy.css';

const TeaserMExplaining = teaserFactory({
  teaserImageStyles: {
    style_320: STYLE_16X9_280,
    style_760: STYLE_3X2_210,
    style_960: STYLE_3X2_280,
    style_1680: STYLE_16X9_440,
  },
  styles: {
    OuterWrapper: styles.OuterWrapper,
    Wrapper: classNames(styles.Wrapper, TEASER_M_EXPLAINING_IDENTIFIER),
    ContentWrapper: styles.ContentWrapper,
    Image: styles.Image,
    ImageWrapper: styles.ImageWrapper,
    Title: styles.Title,
    ShortTitle: styles.ShortTitle,
  },
});

export default TeaserMExplaining;
