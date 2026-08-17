import React from 'react';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import classNames from 'classnames';
import teaserFactory, {
  TeaserFactoryProps,
} from '../../../../../../../../../common/components/Teaser/factory';
import { withTeaserTrackingHandler } from '../../../../../../../../../common/components/Teaser/helpers';
import { getAllAuthors } from '../../../../../../../../../shared/helpers/authors';
import {
  getBadgeByProps,
  getShortTitleElementByProps,
  getSponsorImageByProps,
} from '../../../../shared/helpers';
import Icon from '../../../../../Icon';
import sponsorImageFactory, {
  SPONSOR_IMAGE_POSITION_AUTO,
} from '../../../../../SponsorImage';
import { ADVERTISING_TYPE_BRANDREPORT } from '../../../../../../../../../shared/constants/content';
import { TEASER_IMAGE_IDENTIFIER } from '../../../../constants';
import defaultStyles from './styles.legacy.css';
import {
  TeaserMLImageTileFactoryOptions,
  TeaserMLImageTileFactoryOptionsStyles,
} from './typings';

type TeaserMLImageTileProps = TeaserFactoryProps & {
  cta: string;
};

const SponsorImage = sponsorImageFactory({
  position: SPONSOR_IMAGE_POSITION_AUTO,
});

const getInnerContentByProps = ({
  authors,
  cta,
  subtypeValue,
}: TeaserMLImageTileProps) => {
  if (subtypeValue !== ADVERTISING_TYPE_BRANDREPORT && cta) {
    return (
      <div className={defaultStyles.DedicatedPageLink}>
        {cta}
        <span className={defaultStyles.ArrowWrap}>
          <Icon type="IconArrowRight" />
        </span>
      </div>
    );
  }
  if (!authors?.edges) {
    return null;
  }
  return (
    <div className={defaultStyles.AuthorWrapper}>
      {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<AuthorEdge>[]' is not assignable to type 'AuthorEdge[]'. */}
      {getAllAuthors({ authors: authors.edges })}
    </div>
  );
};

const getStylesByProps = (styles: TeaserMLImageTileFactoryOptionsStyles) => {
  const getStylesByPropsInner = ({ sponsor }: TeaserMLImageTileProps) => {
    return {
      OuterWrapper: defaultStyles.OuterWrapper,
      Wrapper: classNames(defaultStyles.Wrapper, defaultStyles.Link, {
        [defaultStyles.WrapperWithSponsor]: sponsor,
        [styles.MinimumHeight]: !!styles,
      }),
      ImageWrapper: defaultStyles.ImageWrapper,
      ContentWrapper: classNames(
        defaultStyles.TeaserText,
        defaultStyles.InnerWrapper,
      ),
      Title: defaultStyles.TeaserTitleWrapper,
      TitleInner: defaultStyles.TeaserTitle,
      Image: classNames(defaultStyles.Image, TEASER_IMAGE_IDENTIFIER),
    };
  };
  return getStylesByPropsInner;
};

const teaserMLImageTileFactory = ({
  teaserImageStyles,
  styles,
}: TeaserMLImageTileFactoryOptions) => {
  const TeaserMLImageTile = teaserFactory({
    /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue, link } */
    badge: getBadgeByProps(defaultStyles.Badge),
    trackingTeaserHandler: withTeaserTrackingHandler,
    teaserImageStyles,
    /* @ts-ignore TODO: TS2322 ->  Type '({ sponsor } */
    sponsorImage: getSponsorImageByProps(
      defaultStyles.SponsorImageWrapper,
      SponsorImage,
    ),
    /* @ts-ignore TODO: TS2322 ->  Type '({ subtypeValue } */
    shortTitleElement: getShortTitleElementByProps(
      defaultStyles.ShortTitleWrapper,
    ),
    isShortTitleHidden: false,
    /* @ts-ignore TODO: TS2322 ->  Type '({ authors, cta, subtypeValue, } */
    innerContent: getInnerContentByProps,
    styles: getStylesByProps(styles),
  });

  const withUpdatePolicy = shouldUpdate<any>(
    (props: TeaserMLImageTileProps, nextProps: TeaserMLImageTileProps) =>
      props.title !== nextProps.title,
  );

  return compose<any, any>(withUpdatePolicy)(TeaserMLImageTile);
};

export default teaserMLImageTileFactory;
