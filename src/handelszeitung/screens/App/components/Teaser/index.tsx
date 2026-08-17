import React, { ReactElement, memo } from 'react';
import { ensureTeaserInterfaceItem } from './shared/helpers';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../shared/decorators/componentSwitch'. '/Users/bhs/code/work/ */
import createComponentSwitch from '../../../../../shared/decorators/componentSwitch';
import TeaserBookmark from './components/TeaserBookmark';
import TeaserChannel from './components/TeaserChannel';
import TeaserHero from './components/TeaserHero';
import TeaserL from './components/TeaserL';
import TeaserM from './components/TeaserM';
import TeaserOrganization from './components/TeaserOrganization';
import TeaserRanking from './components/TeaserRanking';
import TeaserRankingList from './components/TeaserRankingList';
import TeaserRecommendations from './components/TeaserRecommendations';
import TeaserS from './components/TeaserS';
import TeaserSM from './components/TeaserSM';
import TeaserSponsor from './components/TeaserSponsor';
import TeaserSummary from './components/TeaserSummary';
import TeaserTeamMembers from './components/TeaserTeamMembers';
import TeaserText from './components/TeaserText';
import TeaserTimeline from './components/TeaserTimeline';
import TeaserVideo from './components/TeaserVideo';
import TeaserXS from './components/TeaserXS';
import TeaserXXS from './components/TeaserXXS';
import {
  TEASER_LAYOUT_BOOKMARKS,
  TEASER_LAYOUT_CHANNEL,
  TEASER_LAYOUT_HERO,
  TEASER_LAYOUT_L,
  TEASER_LAYOUT_M,
  TEASER_LAYOUT_ORGANIZATION,
  TEASER_LAYOUT_RANKING,
  TEASER_LAYOUT_RANKING_LIST,
  TEASER_LAYOUT_RECOMMENDATIONS,
  TEASER_LAYOUT_S,
  TEASER_LAYOUT_SM,
  TEASER_LAYOUT_SPONSOR,
  TEASER_LAYOUT_TEAM_MEMBERS,
  TEASER_LAYOUT_TEXT,
  TEASER_LAYOUT_TIMELINE,
  TEASER_LAYOUT_VIDEO,
  TEASER_LAYOUT_XS,
  TEASER_LAYOUT_XXS,
} from '../../../../../shared/constants/teaser';
import { TEASER_LAYOUT_SUMMARY } from './constants';
import { TeaserProps } from './typings';

const Switch = createComponentSwitch({
  [TEASER_LAYOUT_RECOMMENDATIONS]: TeaserRecommendations,
  [TEASER_LAYOUT_SM]: TeaserSM,
  [TEASER_LAYOUT_HERO]: TeaserHero,
  [TEASER_LAYOUT_L]: TeaserL,
  [TEASER_LAYOUT_M]: TeaserM,
  [TEASER_LAYOUT_S]: TeaserS,
  [TEASER_LAYOUT_XS]: TeaserXS,
  [TEASER_LAYOUT_XXS]: TeaserXXS,
  [TEASER_LAYOUT_SPONSOR]: TeaserSponsor,
  [TEASER_LAYOUT_RANKING_LIST]: TeaserRankingList,
  [TEASER_LAYOUT_TEXT]: TeaserText,
  [TEASER_LAYOUT_TIMELINE]: TeaserTimeline,
  [TEASER_LAYOUT_TEAM_MEMBERS]: TeaserTeamMembers,
  [TEASER_LAYOUT_ORGANIZATION]: TeaserOrganization,
  [TEASER_LAYOUT_RANKING]: TeaserRanking,
  [TEASER_LAYOUT_VIDEO]: TeaserVideo,
  [TEASER_LAYOUT_CHANNEL]: TeaserChannel,
  [TEASER_LAYOUT_BOOKMARKS]: TeaserBookmark,
  [TEASER_LAYOUT_SUMMARY]: TeaserSummary,
});

const Teaser = (props: TeaserProps): ReactElement => {
  if (props.teaserDisplay === 'Summary') {
    return (
      <TeaserSummary
        preferredUri={props.preferredUri}
        teaserSummary={props.teaserSummary}
        teaserCTALabel={props.teaserCTALabel}
      />
    );
  }

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
