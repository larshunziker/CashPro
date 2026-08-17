import classNames from 'classnames';
import teaserFactory from '../../../../../../../../../common/components/Teaser/factory';
import { getShortTitleElementByProps } from '../../../../../Teaser/shared/helpers';
import {
  STYLE_16X9_280,
  STYLE_16X9_440,
  STYLE_3X2_210,
  STYLE_3X2_280,
} from '../../../../../../../../../shared/constants/images';
import { TEASER_M_ADVERTORIAL_IDENTIFIER } from '../../../../constants';
import styles from './styles.legacy.css';

const TeaserMAdvertorial = teaserFactory({
  teaserImageStyles: {
    style_320: STYLE_16X9_280,
    style_760: STYLE_3X2_210,
    style_960: STYLE_3X2_280,
    style_1680: STYLE_16X9_440,
  },
  leadOptions: {
    suffixText: '',
  },
  /* @ts-ignore TODO: TS2322 ->  Type '({ shortTitle, link, ...props } */
  shortTitleElement: getShortTitleElementByProps(styles.ShortTitle),
  styles: {
    OuterWrapper: styles.OuterWrapper,
    Wrapper: classNames(styles.Wrapper, TEASER_M_ADVERTORIAL_IDENTIFIER),
    ContentWrapper: styles.ContentWrapper,
    Image: styles.Image,
    ImageWrapper: styles.ImageWrapper,
    Title: styles.Title,
    Lead: styles.Lead,
  },
});

export default TeaserMAdvertorial;
