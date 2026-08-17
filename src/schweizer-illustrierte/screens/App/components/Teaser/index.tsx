import React, { ReactElement, useRef } from 'react';
import { ensureTeaserInterface } from './shared/helpers';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../shared/decorators/componentSwitch'. '/Users/bhs/code/work/ */
import createComponentSwitch from '../../../../../shared/decorators/componentSwitch';
import TeaserBlogPostMaxi from './components/TeaserBlogPostMaxi';
import TeaserBlogPostMedium from './components/TeaserBlogPostMedium';
import TeaserBookmark from './components/TeaserBookmark';
import TeaserChannel from './components/TeaserChannel';
import TeaserHeroS from './components/TeaserHeroS';
import TeaserHeroXl from './components/TeaserHeroXl';
import TeaserHeroXl2x1 from './components/TeaserHeroXl2x1';
import TeaserHeroXlSlider from './components/TeaserHeroXlSlider';
import TeaserHoroscope from './components/TeaserHoroscope';
import TeaserL from './components/TeaserL';
import TeaserLatest from './components/TeaserLatest';
import TeaserM from './components/TeaserM';
import TeaserPortrait from './components/TeaserPortrait';
import TeaserProduct from './components/TeaserProduct';
import TeaserPuzzle from './components/TeaserPuzzle';
import TeaserRelated from './components/TeaserRelated';
import TeaserS from './components/TeaserS';
import TeaserSpecialHero from './components/TeaserSpecialHero';
import TeaserSpecialM from './components/TeaserSpecialM';
import TeaserSpecialS from './components/TeaserSpecialS';
import TeaserSubscriptionL from './components/TeaserSubscriptionL';
import TeaserSubscriptionM from './components/TeaserSubscriptionM';
import TeaserVideoS from './components/TeaserVideoS';
import TeaserXL from './components/TeaserXL';
import useContentPrefetching from '../../../../../common/hooks/useContentPrefetching';
import getEntityQueueLimitByPath from '../Router/getEntityQueueLimitByPath';
import {
  LANDING_PAGE_CONTENT_TYPE,
  TEASER_CONTENT_TYPE,
} from '../../../../../shared/constants/content';
import {
  TEASER_LAYOUT_BLOG_POST_MAXI,
  TEASER_LAYOUT_BLOG_POST_MEDIUM,
  TEASER_LAYOUT_BOOKMARKS,
  TEASER_LAYOUT_CHANNEL,
  TEASER_LAYOUT_HERO_S,
  TEASER_LAYOUT_HERO_XL,
  TEASER_LAYOUT_HERO_XL_2_X_1,
  TEASER_LAYOUT_HERO_XL_SLIDER,
  TEASER_LAYOUT_HOROSCOPE,
  TEASER_LAYOUT_L,
  TEASER_LAYOUT_LATEST,
  TEASER_LAYOUT_M,
  TEASER_LAYOUT_PORTRAIT,
  TEASER_LAYOUT_PRODUCT,
  TEASER_LAYOUT_PUZZLE,
  TEASER_LAYOUT_RELATED,
  TEASER_LAYOUT_S,
  TEASER_LAYOUT_SPECIAL_HERO,
  TEASER_LAYOUT_SPECIAL_M,
  TEASER_LAYOUT_SPECIAL_S,
  TEASER_LAYOUT_SUBSCRIPTION_L,
  TEASER_LAYOUT_SUBSCRIPTION_M,
  TEASER_LAYOUT_VIDEO_S,
  TEASER_LAYOUT_XL,
} from '../../../../../shared/constants/teaser';
import { DEFAULT_PUBLICATION } from '../../constants';
import {
  CHANNEL_TYPE_BLOG,
  CHANNEL_TYPE_SPECIAL,
} from '../../screens/Channel/constants';
import { LANDING_PAGE_DEFAULT_GRID_PAGE_SIZE } from '../../screens/LandingPage/constants';
import { OVERVIEW_PAGE_SIZE } from '../TeaserGrid/constants';
import {
  TEASER_STYLE_SI,
  TEASER_STYLE_SY,
} from './components/TeaserSubscriptionL/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../Router/queries'. '/Users/bhs/code/work/rasch-stack/src/schweizer-illus */
import { ROUTER_ROUTE_BY_PATH_QUERY } from '../Router/queries';
import { TeaserComponent, TeaserProps } from './typings';

export type TeaserPropsInner = TeaserProps;

const Switch = createComponentSwitch({
  [TEASER_LAYOUT_HERO_XL]: TeaserHeroXl,
  [TEASER_LAYOUT_HERO_XL_SLIDER]: TeaserHeroXlSlider,
  [TEASER_LAYOUT_XL]: TeaserXL,
  [TEASER_LAYOUT_HERO_XL_2_X_1]: TeaserHeroXl2x1,
  [TEASER_LAYOUT_L]: TeaserL,
  [TEASER_LAYOUT_M]: TeaserM,
  [TEASER_LAYOUT_SPECIAL_HERO]: TeaserSpecialHero,
  [TEASER_LAYOUT_SPECIAL_M]: TeaserSpecialM,
  [TEASER_LAYOUT_SPECIAL_S]: TeaserSpecialS,
  [TEASER_LAYOUT_PORTRAIT]: TeaserPortrait,
  [TEASER_LAYOUT_S]: TeaserS,
  [TEASER_LAYOUT_HERO_S]: TeaserHeroS,
  [TEASER_LAYOUT_VIDEO_S]: TeaserVideoS,
  [TEASER_LAYOUT_RELATED]: TeaserRelated,
  [TEASER_LAYOUT_PRODUCT]: TeaserProduct,
  [TEASER_LAYOUT_SUBSCRIPTION_M]: TeaserSubscriptionM,
  [TEASER_LAYOUT_SUBSCRIPTION_L]: TeaserSubscriptionL,
  [TEASER_LAYOUT_BLOG_POST_MEDIUM]: TeaserBlogPostMedium,
  [TEASER_LAYOUT_BLOG_POST_MAXI]: TeaserBlogPostMaxi,
  [TEASER_LAYOUT_CHANNEL]: TeaserChannel,
  [TEASER_LAYOUT_HOROSCOPE]: TeaserHoroscope,
  [TEASER_LAYOUT_LATEST]: TeaserLatest,
  [TEASER_LAYOUT_BOOKMARKS]: TeaserBookmark,
  [TEASER_LAYOUT_PUZZLE]: TeaserPuzzle,
});

const Teaser: TeaserComponent = ({
  component,
  ...props
}: TeaserPropsInner): ReactElement => {
  let teaserComponent = component;

  if (props?.channel?.channelType === CHANNEL_TYPE_BLOG) {
    // when we have BlogPost teaser we should replace teasers like:
    // teaser/s -> teaser/blog-post-medium
    // teaser/m -> teaser/blog-post-medium
    // teaser/l -> teaser/blog-post-maxi

    if (
      teaserComponent === TEASER_LAYOUT_S ||
      teaserComponent === TEASER_LAYOUT_M
    ) {
      teaserComponent = TEASER_LAYOUT_BLOG_POST_MEDIUM;
    } else if (teaserComponent === TEASER_LAYOUT_L) {
      teaserComponent = TEASER_LAYOUT_BLOG_POST_MAXI;
    }
  } else if (
    props?.__typename === TEASER_CONTENT_TYPE &&
    teaserComponent !== TEASER_LAYOUT_SUBSCRIPTION_L
  ) {
    /* replace teaser subscription m for entity queue grid config, ONLY if props.style is set */
    if (props?.style === TEASER_STYLE_SI || props?.style === TEASER_STYLE_SY) {
      teaserComponent = TEASER_LAYOUT_SUBSCRIPTION_M;
    }
  } else if (
    props?.channel?.channelType === CHANNEL_TYPE_SPECIAL &&
    props.__typename === LANDING_PAGE_CONTENT_TYPE
  ) {
    teaserComponent = TEASER_LAYOUT_SPECIAL_M;
  }

  const teaserRef = useRef(null);
  let url: string;
  if (props?.preferredUri && props.preferredUri.startsWith('/')) {
    url = props.preferredUri.replace('/', '');
  }

  useContentPrefetching(false, teaserRef, {
    operation: 'RouterRouteByPath',
    query: ROUTER_ROUTE_BY_PATH_QUERY,
    variables: {
      /* @ts-ignore TODO: TS2454 ->  Variable 'url' is used before being assigned. */
      path: url,
      publication: DEFAULT_PUBLICATION,
      overviewPageSize: OVERVIEW_PAGE_SIZE,
      overviewPageOffset: OVERVIEW_PAGE_SIZE,
      landingPageGridSize: LANDING_PAGE_DEFAULT_GRID_PAGE_SIZE,
      landingPageGridOffset: LANDING_PAGE_DEFAULT_GRID_PAGE_SIZE,
      /* @ts-ignore TODO: TS2454 ->  Variable 'url' is used before being assigned. */
      entityQueueLimit: getEntityQueueLimitByPath(url),
    },
  });

  return (
    <div ref={teaserRef}>
      <Switch
        {...props}
        {...ensureTeaserInterface(props)}
        component={teaserComponent}
      />
    </div>
  );
};

// TODO: if possible we should rename this. Because of this component switch, all components in the react devtools are called "Teaser" instead of their correct name e.g. TeaserS, TeaserVideoS etc.
export default Teaser;
