import React from 'react';
import classNames from 'classnames';
import teaserFactory from '../../../../../../../../../common/components/Teaser/factory';
import { getShortTitleElementByProps } from '../../../../../Teaser/shared/helpers';
import Error from '../../../../../Error';
import TeaserM from '../../../../components/TeaserM';
import {
  STYLE_16X9_800,
  STYLE_1X1_140,
  STYLE_3X2_440,
  STYLE_3X2_770,
} from '../../../../../../../../../shared/constants/images';
import { TEASER_M_GUIDE_IDENTIFIER } from '../../../../constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import type { TeaserProps } from '../../../../typings';

const TeaserHeroGuide = teaserFactory({
  teaserImageStyles: {
    style_320: STYLE_1X1_140,
    style_760: STYLE_3X2_440,
    style_960: STYLE_3X2_770,
    style_1680: STYLE_16X9_800,
  },
  styles: {
    Wrapper: classNames(TEASER_M_GUIDE_IDENTIFIER, styles.Wrapper),
    ContentWrapper: styles.ContentWrapper,
    Title: styles.Title,
    Image: styles.Image,
    ImageWrapper: styles.ImageWrapper,
    ShortTitle: styles.ShortTitle,
  },
  /* @ts-ignore TODO: TS2322 ->  Type '({ shortTitle, link, ...props } */
  shortTitleElement: getShortTitleElementByProps(styles.ShortTitle),
});

const TeaserHeroGuideWrapper = (props: TeaserProps) => (
  <>
    <div className={grid.HiddenSmUp}>
      {__DEVELOPMENT__ ? (
        <Error msg={`TeaserHeroGuide is not available on viewport/xs`} />
      ) : (
        <TeaserM {...props} />
      )}
    </div>
    <div className={grid.HiddenSmDown}>
      <TeaserHeroGuide {...props} />
    </div>
  </>
);

export default TeaserHeroGuideWrapper;
