/* istanbul ignore file */

import classNames from 'classnames';
import teaserFactory from '../../../../../../../common/components/Teaser/factory';
import {
  STYLE_TEASER_3_2,
  STYLE_TEASER_3_2_LARGE,
  STYLE_TEASER_3_2_SMALL,
} from '../../../../../../../shared/constants/images';
import { TEASER_RECIPE_IDENTIFIER } from '../../constants';
import styles from './styles.legacy.css';

const TeaserRecipe = teaserFactory({
  teaserImageStyles: {
    style_320: STYLE_TEASER_3_2_SMALL,
    style_960: STYLE_TEASER_3_2,
    style_1680: STYLE_TEASER_3_2_LARGE,
  },
  isShortTitleHidden: true,
  styles: {
    Wrapper: classNames(TEASER_RECIPE_IDENTIFIER, styles.Wrapper),
    ContentWrapper: styles.ContentWrapper,
    ImageWrapper: styles.ImageWrapper,
    Image: styles.Image,
    Title: styles.Title,
  },
});

export default TeaserRecipe;
