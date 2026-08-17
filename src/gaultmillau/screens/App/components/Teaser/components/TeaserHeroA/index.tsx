/**
 * @file   TeaserHeroA
 * @desc   This serves as both Teasers HeroA and HeroB from the designs. These two teasers
 *         look exactly the same. The only difference is that image and content wrapper
 *         are swapped from sm viewport on for HeroB. We achieve this with the position property
 *         which we will receive from the grid.
 *         position == left: HeroA
 *         position == right: HeroB
 */

import classNames from 'classnames';
import teaserFactory from '../../../../../../../common/components/Teaser/factory';
import {
  getIconAndBorderByProps,
  getInnerContentByProps,
  getShortTitleElementByProps,
} from '../../shared/helpers';
import {
  STYLE_3X2_440,
  STYLE_3X2_770,
} from '../../../../../../../shared/constants/images';
import {
  TEASER_HERO_A_IDENTIFIER,
  TEASER_HERO_B_IDENTIFIER,
} from '../../constants';
import styles from './styles.legacy.css';
import { TeaserFactoryOptionsStyles } from '../../../../../../../common/components/Teaser/typings';
import { TeaserProps } from '../../shared/typings';

export const getStylesByProps = ({
  position = 'left',
}: TeaserProps): TeaserFactoryOptionsStyles => {
  const isTeaserHeroA = position === 'left';

  return {
    Wrapper: classNames(styles.Wrapper, {
      [TEASER_HERO_A_IDENTIFIER]: isTeaserHeroA,
      [TEASER_HERO_B_IDENTIFIER]: !isTeaserHeroA,
      [styles.WrapperHeroB]: !isTeaserHeroA,
    }),
    ContentWrapper: classNames(styles.ContentWrapper, {
      [styles.Left]: !isTeaserHeroA,
    }),
    ImageWrapper: classNames(styles.ImageWrapper, {
      [styles.Left]: isTeaserHeroA,
    }),
    Image: styles.Image,
    Title: styles.Title,
    Lead: styles.Lead,
  };
};

const TeaserHero = teaserFactory({
  teaserImageStyles: {
    style_320: STYLE_3X2_440,
    style_1680: STYLE_3X2_770,
  },
  isIconPositionOnImage: true,
  icon: getIconAndBorderByProps(styles.PlayIcon),
  shortTitleElement: getShortTitleElementByProps(styles, styles.ShortTitle),
  innerContent: getInnerContentByProps(styles.Lead),
  styles: getStylesByProps,
});

export default TeaserHero;
