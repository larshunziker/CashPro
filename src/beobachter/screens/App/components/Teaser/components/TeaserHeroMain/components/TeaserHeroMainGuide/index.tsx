import React, { FC } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import teaserFactory from '../../../../../../../../../common/components/Teaser/factory';
import { withTeaserTrackingHandler } from '../../../../../../../../../common/components/Teaser/helpers';
import { getShortTitleElementByProps } from '../../../../../Teaser/shared/helpers';
import { getIconByProps } from '../../../../shared/helpers';
import locationStateSelector from '../../../../../../../../../shared/selectors/locationStateSelector';
import { HOME } from '../../../../../../../../shared/actions/route';
import Img from '../../../../../Img';
import TeaserM from '../../../TeaserM';
import { RESTRICTION_STATUS_PAID } from '../../../../../../../../../shared/constants/content';
import {
  STYLE_16X9_280,
  STYLE_8X3_1130,
  STYLE_8X3_890,
} from '../../../../../../../../../shared/constants/images';
import { TEASER_LAYOUT_HERO_MAIN } from '../../../../../../../../../shared/constants/teaser';
import { TEASER_IMAGE_IDENTIFIER } from '../../../../constants';
import { TEASER_ICON_TYPE_HERO_MAIN_VIDEO } from '../../../../shared/components/TeaserIcon/constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import beobachterPlus from '../../../../../../assets/graphics/beobachterplus.svg';
import { TeaserProps } from '../../../../typings';

type TeaserHeroMainGuidePropsInner = TeaserProps & {
  locationStateVertical?: string;
};

const getTitleBadgeByProps = ({
  restrictionStatus,
}: TeaserHeroMainGuidePropsInner) =>
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

const TeaserHeroMainGuide = teaserFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '({ __typename, hasVideo } */
  icon: getIconByProps(styles.Icon, TEASER_ICON_TYPE_HERO_MAIN_VIDEO),
  /* @ts-ignore TODO: TS2322 ->  Type '({ restrictionStatus, } */
  titleBadge: getTitleBadgeByProps,
  trackingTeaserHandler: withTeaserTrackingHandler,
  teaserImageStyles: {
    style_320: STYLE_16X9_280,
    style_760: STYLE_8X3_890,
    style_1680: STYLE_8X3_1130,
  },
  isIconPositionOnImage: true,
  /* @ts-ignore TODO: TS2322 ->  Type '({ shortTitle, link, ...props } */
  shortTitleElement: getShortTitleElementByProps(styles.ShortTitle),
  styles: {
    OuterWrapper: styles.OuterWrapper,
    Wrapper: classNames(styles.Wrapper, styles.Link, TEASER_LAYOUT_HERO_MAIN),
    ContentWrapper: styles.ContentWrapper,
    Title: styles.TeaserTitleWrapper,
    TitleInner: styles.TeaserTitle,
    ImageWrapper: styles.ImageWrapper,
    Image: classNames(TEASER_IMAGE_IDENTIFIER),
  },
});

const TeaserHeroMainGuideWrapper: FC<TeaserHeroMainGuidePropsInner> = (
  props,
) => (
  <>
    <div
      className={classNames(grid.HiddenSmUp, {
        [styles.OuterWrapper]: props.locationStateVertical === HOME,
        [styles.OuterWrapperVertical]: props.locationStateVertical !== HOME,
      })}
    >
      <TeaserM {...props} />
    </div>

    <div className={grid.HiddenSmDown}>
      <TeaserHeroMainGuide {...props} />
    </div>
  </>
);

const mapStateToProps = (state: ReduxState) => ({
  locationStateVertical: locationStateSelector(state).vertical,
});

export default connect(mapStateToProps)(TeaserHeroMainGuideWrapper);
