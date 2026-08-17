import React, { ReactElement, memo } from 'react';
import { ensureTeaserInterfaceItem } from './shared/helpers';
import createComponentSwitch from '../../../../shared/decorators/componentSwitch';
import WidgetParagraph from '../Paragraphs/components/WidgetParagraph';
import TeaserBookmark from './components/TeaserBookmark';
import TeaserEditorialPicks from './components/TeaserEditorialPicks';
import TeaserHero from './components/TeaserHero';
import TeaserL from './components/TeaserL';
import TeaserM from './components/TeaserM';
import TeaserPerson from './components/TeaserPerson';
import TeaserPortfolioNews from './components/TeaserPortfolioNews';
import TeaserRecommendations from './components/TeaserRecommendations';
import TeaserSponsor from './components/TeaserSponsor';
import TeaserSponsorList from './components/TeaserSponsorList';
import TeaserText from './components/TeaserText';
import TeaserWide from './components/TeaserWide';
import { WIDGET_CONTENT_TYPE } from '../../../../../shared/constants/content';
import {
  TEASER_LAYOUT_BOOKMARKS,
  TEASER_LAYOUT_HERO,
  TEASER_LAYOUT_L,
  TEASER_LAYOUT_M,
  TEASER_LAYOUT_PERSON,
  TEASER_LAYOUT_RECOMMENDATIONS,
  TEASER_LAYOUT_SPONSOR,
  TEASER_LAYOUT_SPONSOR_LIST,
  TEASER_LAYOUT_TEXT,
  TEASER_LAYOUT_WIDE,
} from '../../../../../shared/constants/teaser';
import {
  TEASER_LAYOUT_EDITORIAL_PICKS,
  TEASER_LAYOUT_PORTFOLIO_NEWS,
} from './constants';
import { TeaserProps } from './typings';

const Switch = createComponentSwitch({
  [TEASER_LAYOUT_BOOKMARKS]: TeaserBookmark,
  [TEASER_LAYOUT_TEXT]: TeaserText,
  [TEASER_LAYOUT_PORTFOLIO_NEWS]: TeaserPortfolioNews,
  [TEASER_LAYOUT_EDITORIAL_PICKS]: TeaserEditorialPicks,
  [TEASER_LAYOUT_HERO]: TeaserHero,
  [TEASER_LAYOUT_L]: TeaserL,
  [TEASER_LAYOUT_M]: TeaserM,
  [TEASER_LAYOUT_SPONSOR]: TeaserSponsor,
  [TEASER_LAYOUT_PERSON]: TeaserPerson,
  [TEASER_LAYOUT_SPONSOR_LIST]: TeaserSponsorList,
  [TEASER_LAYOUT_RECOMMENDATIONS]: TeaserRecommendations,
  [TEASER_LAYOUT_WIDE]: TeaserWide,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const Teaser = (props): ReactElement => {
  if (props.__typename === WIDGET_CONTENT_TYPE) {
    return (
      <WidgetParagraph
        widgetParagraph={props as WidgetParagraph}
        origin={props?.origin}
      />
    );
  }

  return (
    <Switch
      component={props.component}
      itemIndex={typeof props?.itemIndex === 'number' ? props?.itemIndex : null}
      // TODO: make sure that we can get rid of props.node and just use the root level data!
      {...ensureTeaserInterfaceItem(
        { ...props, ...props.node },
        props?.itemIndex,
        props.origin,
      )}
    />
  );
};

export default memo<TeaserProps>(Teaser);
