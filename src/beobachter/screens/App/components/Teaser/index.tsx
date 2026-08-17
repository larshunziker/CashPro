import React, { ReactElement, memo } from 'react';
import { ensureTeaserInterfaceItem } from './shared/helpers';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../shared/decorators/componentSwitch'. '/Users/bhs/code/work/ */
import createComponentSwitch from '../../../../../shared/decorators/componentSwitch';
import TeaserAuthor from './components/TeaserAuthor';
import TeaserChannel from './components/TeaserChannel';
import TeaserHero from './components/TeaserHero';
import TeaserHeroMain from './components/TeaserHeroMain';
import TeaserHeroNew from './components/TeaserHeroNew';
import TeaserM from './components/TeaserM';
import TeaserMD from './components/TeaserMD';
import TeaserMdColumn from './components/TeaserMdColumn';
import TeaserRecommendations from './components/TeaserRecommendations';
import TeaserSM from './components/TeaserSM';
import TeaserShopProduct from './components/TeaserShopProduct';
import TeaserSponsor from './components/TeaserSponsor';
import TeaserTextContentBox from './components/TeaserTextContentBox';
import TeaserVideo from './components/TeaserVideo';
import TeaserWide from './components/TeaserWide';
import TeaserAuthorSM from './components/TeaserAuthorSM';
import TeaserBookmark from './components/TeaserBookmark';
import TeaserMobileHeroNewToDesktopWide from './components/combinedTeasers/TeaserMobileHeroNewToDesktopWide';
import TeaserMobileSmToDesktopMd from './components/combinedTeasers/TeaserMobileSmToDesktopMd';
import TeaserLegalAdvice from './components/TeaserLegalAdvice';
import TeaserTool from './components/TeaserTool';
import {
  TEASER_LAYOUT_BOOKMARKS,
  TEASER_LAYOUT_CHANNEL,
  TEASER_LAYOUT_HERO,
  TEASER_LAYOUT_HERO_MAIN,
  TEASER_LAYOUT_HERO_NEW,
  TEASER_LAYOUT_M,
  TEASER_LAYOUT_MD,
  TEASER_LAYOUT_MD_COLUMN,
  TEASER_LAYOUT_RECOMMENDATIONS,
  TEASER_LAYOUT_SM,
  TEASER_LAYOUT_SHOP_PRODUCT,
  TEASER_LAYOUT_SPONSOR,
  TEASER_LAYOUT_TEXT_CONTENT_BOX,
  TEASER_LAYOUT_VIDEO,
  TEASER_LAYOUT_WIDE,
  TEASER_LAYOUT_AUTHOR,
  TEASER_LAYOUT_AUTHOR_SM,
  TEASER_LAYOUT_TOOL,
  TEASER_LAYOUT_LEGAL_ADVICE,
} from '../../../../../shared/constants/teaser';
import {
  TEASER_LAYOUT_MOBILE_HERO_NEW_TO_DESKTOP_WIDE,
  TEASER_LAYOUT_MOBILE_SM_TO_DESKTOP_MD,
} from '../../../../shared/constants/teaser';
import { TeaserProps } from './typings';

const Switch = createComponentSwitch({
  [TEASER_LAYOUT_HERO]: TeaserHero,
  [TEASER_LAYOUT_HERO_NEW]: TeaserHeroNew,
  [TEASER_LAYOUT_WIDE]: TeaserWide,
  [TEASER_LAYOUT_SM]: TeaserSM,
  [TEASER_LAYOUT_M]: TeaserM,
  [TEASER_LAYOUT_MD]: TeaserMD,
  [TEASER_LAYOUT_MD_COLUMN]: TeaserMdColumn,
  [TEASER_LAYOUT_RECOMMENDATIONS]: TeaserRecommendations,
  [TEASER_LAYOUT_VIDEO]: TeaserVideo,
  [TEASER_LAYOUT_CHANNEL]: TeaserChannel,
  [TEASER_LAYOUT_HERO_MAIN]: TeaserHeroMain,
  [TEASER_LAYOUT_TEXT_CONTENT_BOX]: TeaserTextContentBox,
  [TEASER_LAYOUT_SHOP_PRODUCT]: TeaserShopProduct,
  [TEASER_LAYOUT_SPONSOR]: TeaserSponsor,
  [TEASER_LAYOUT_AUTHOR]: TeaserAuthor,
  [TEASER_LAYOUT_AUTHOR_SM]: TeaserAuthorSM,
  [TEASER_LAYOUT_BOOKMARKS]: TeaserBookmark,
  [TEASER_LAYOUT_MOBILE_HERO_NEW_TO_DESKTOP_WIDE]:
    TeaserMobileHeroNewToDesktopWide,
  [TEASER_LAYOUT_MOBILE_SM_TO_DESKTOP_MD]: TeaserMobileSmToDesktopMd,
  [TEASER_LAYOUT_TOOL]: TeaserTool,
  [TEASER_LAYOUT_LEGAL_ADVICE]: TeaserLegalAdvice,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const Teaser = (props): ReactElement => {
  return (
    <Switch
      component={props.component}
      itemIndex={typeof props?.itemIndex === 'number' ? props?.itemIndex : null}
      // TODO: make sure that we can get rid of props.node and just use the root level data!
      {...ensureTeaserInterfaceItem({ ...props, ...props.node })}
    />
  );
};

export default memo<TeaserProps>(Teaser);
