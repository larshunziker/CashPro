import React, { ComponentType } from 'react';
import classNames from 'classnames';
import teaserFactory from '../../../../../../../../../common/components/Teaser/factory';
import { isInsideColumn } from '../../../../../../../../shared/helpers/isInsideColumn';
import { getShortTitleElementByProps } from '../../../../shared/helpers';
import Error from '../../../../../Error';
import TeaserM from '../../../../components/TeaserM';
import {
  STYLE_16X9_280,
  STYLE_16X9_800,
  STYLE_1X1_250,
  STYLE_3X2_440,
} from '../../../../../../../../../shared/constants/images';
import { TEASER_HERO_ADVERTORIAL_IDENTIFIER } from '../../../../constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { TeaserProps } from '../../../../typings';

type TeaserHeroAdvertorialPropsInner = TeaserProps;

/* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
const getStylesByProps = ({ origin }) => ({
  Wrapper: classNames(TEASER_HERO_ADVERTORIAL_IDENTIFIER, styles.Wrapper),
  ContentWrapper: styles.ContentWrapper,
  Title: styles.Title,
  Lead: styles.Lead,
  Image: styles.Image,
  ImageWrapper: classNames(styles.ImageWrapper, {
    [styles.GuideImageWrapper]: isInsideColumn(origin),
  }),
});

const TeaserHeroAdvertorial = teaserFactory({
  teaserImageStyles: {
    style_320: STYLE_16X9_280,
    style_760: STYLE_1X1_250,
    style_960: STYLE_3X2_440,
    style_1680: STYLE_16X9_800,
  },
  leadOptions: {
    suffixText: '',
  },
  /* @ts-ignore TODO: TS2322 ->  Type '({ shortTitle, link, ...props } */
  shortTitleElement: getShortTitleElementByProps(styles.ShortTitle),
  styles: getStylesByProps,
});

const TeaserHeroAdvertorialWrapper: ComponentType<TeaserProps> = (
  props: TeaserHeroAdvertorialPropsInner,
) => (
  <>
    <div className={grid.HiddenSmUp}>
      {__DEVELOPMENT__ ? (
        <Error msg={`TeaserHeroAdvertorial is not available on viewport/xs`} />
      ) : (
        <TeaserM {...props} />
      )}
    </div>

    <div className={grid.HiddenSmDown}>
      <TeaserHeroAdvertorial {...props} />
    </div>
  </>
);

export default TeaserHeroAdvertorialWrapper;
