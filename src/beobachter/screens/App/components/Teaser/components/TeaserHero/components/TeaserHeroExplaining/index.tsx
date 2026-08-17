import React, { ComponentType } from 'react';
import classNames from 'classnames';
import teaserFactory from '../../../../../../../../../common/components/Teaser/factory';
import { isInsideColumn } from '../../../../../../../../shared/helpers/isInsideColumn';
import Error from '../../../../../Error';
import TeaserM from '../../../../components/TeaserM';
import {
  STYLE_16X9_560,
  STYLE_16X9_800,
  STYLE_1X1_140,
  STYLE_1X1_250,
} from '../../../../../../../../../shared/constants/images';
import { TEASER_HERO_EXPLAINING_IDENTIFIER } from '../../../../constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import type { TeaserProps } from '../../../../typings';

type TeaserHeroExplainingPropsInner = TeaserProps;

/* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
const getStylesByProps = ({ origin }) => ({
  Wrapper: classNames(TEASER_HERO_EXPLAINING_IDENTIFIER, styles.Wrapper),
  ContentWrapper: styles.ContentWrapper,
  Title: styles.Title,
  Image: styles.Image,
  ImageWrapper: classNames(styles.ImageWrapper, {
    [styles.GuideImageWrapper]: isInsideColumn(origin),
  }),
  ShortTitle: styles.ShortTitle,
});

const TeaserHeroExplaining = teaserFactory({
  teaserImageStyles: {
    style_320: STYLE_1X1_140,
    style_760: STYLE_1X1_250,
    style_960: STYLE_16X9_560,
    style_1680: STYLE_16X9_800,
  },
  styles: getStylesByProps,
});

const TeaserHeroExplainingWrapper: ComponentType<TeaserProps> = (
  props: TeaserHeroExplainingPropsInner,
) => (
  <>
    <div className={grid.HiddenSmUp}>
      {__DEVELOPMENT__ ? (
        <Error msg={`TeaserHeroExplaining is not available on viewport/xs`} />
      ) : (
        <TeaserM {...props} />
      )}
    </div>

    <div className={grid.HiddenSmDown}>
      <TeaserHeroExplaining {...props} />
    </div>
  </>
);

export default TeaserHeroExplainingWrapper;
