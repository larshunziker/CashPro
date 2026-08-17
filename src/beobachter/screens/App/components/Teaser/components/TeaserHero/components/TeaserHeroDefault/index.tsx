import React, { ComponentType } from 'react';
import classNames from 'classnames';
import teaserFactory, {
  TeaserFactoryProps,
} from '../../../../../../../../../common/components/Teaser/factory';
import { isInsideColumn } from '../../../../../../../../shared/helpers/isInsideColumn';
import { getIconByProps } from '../../../../shared/helpers';
import Error from '../../../../../Error';
import Img from '../../../../../Img';
import TeaserM from '../../../../components/TeaserM';
import {
  ARTICLE_TYPE_RATGEBER,
  RESTRICTION_STATUS_PAID,
} from '../../../../../../../../../shared/constants/content';
import {
  STYLE_16X9_800,
  STYLE_3X2_440,
} from '../../../../../../../../../shared/constants/images';
import { TEASER_LAYOUT_HERO } from '../../../../../../../../../shared/constants/teaser';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import beobachterPlus from 'graphics/beobachterplus.svg';
import { TeaserProps } from '../../../../typings';

type TeaserHeroDefaultPropsInner = TeaserProps;

const getTitleBadgeByProps = ({ restrictionStatus }: TeaserFactoryProps) =>
  restrictionStatus === RESTRICTION_STATUS_PAID ? (
    <Img
      addClass={styles.BeoPlusLogo}
      alt="Beobachter Plus"
      url={beobachterPlus}
      width={26}
      height={13}
      ignoreLandscapeClass
    />
  ) : null;

/* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
const getStylesByProps = ({ origin }) => ({
  Wrapper: classNames(TEASER_LAYOUT_HERO, styles.Wrapper),
  ContentWrapper: classNames(styles.ContentWrapper, {
    [styles.RatgeberAktuellContentWrapper]: origin === ARTICLE_TYPE_RATGEBER,
  }),
  Title: styles.Title,
  Lead: styles.Lead,
  Image: styles.Image,
  ImageWrapper: classNames(styles.ImageWrapper, {
    [styles.GuideImageWrapper]: isInsideColumn(origin),
    [styles.RatgeberAktuellImageWrapper]: origin === ARTICLE_TYPE_RATGEBER,
  }),
  ShortTitle: styles.ShortTitle,
});

const TeaserHeroDefault = teaserFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '({ __typename, hasVideo } */
  icon: getIconByProps(styles.Icon),
  teaserImageStyles: {
    style_320: STYLE_3X2_440,
    style_1680: STYLE_16X9_800,
  },
  disableWrapperClassName: true,
  /* @ts-ignore TODO: TS2322 ->  Type '({ restrictionStatus } */
  titleBadge: getTitleBadgeByProps,
  leadOptions: {
    suffixText: '',
  },
  isIconPositionOnImage: true,
  styles: getStylesByProps,
});

const TeaserHeroDefaultWrapper: ComponentType<TeaserProps> = (
  props: TeaserHeroDefaultPropsInner,
) => (
  <>
    <div className={grid.HiddenSmUp}>
      {__DEVELOPMENT__ ? (
        <Error msg={`TeaserHeroMainOpinion is not available on viewport/xs`} />
      ) : (
        <TeaserM {...props} />
      )}
    </div>

    <div className={grid.HiddenSmDown}>
      <TeaserHeroDefault {...props} />
    </div>
  </>
);

export default TeaserHeroDefaultWrapper;
