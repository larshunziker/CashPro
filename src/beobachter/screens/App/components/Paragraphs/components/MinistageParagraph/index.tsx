import React, { ReactElement } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/decorators/withImpressionTrackingObserver'. ' */
import withImpressionTrackingObserver from '../../../../../../../shared/decorators/withImpressionTrackingObserver';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import MinistageAccordion from './components/MinistageAccordion';
import MinistageAuthor from './components/MinistageAuthor';
import MinistageListicle from './components/MinistageListicle';
import MinistageNewsletter from './components/MinistageNewsletter';
import MinistageRechtsratgeber from './components/MinistageRechtsratgeber';
import MinistageSearch from './components/MinistageSearch';
import MinistageSingleAlertTopic from './components/MinistageSingleAlertTopic';
import MinistageTeaser from './components/MinistageTeaser';
import MinistageTrendingTopics from './components/MinistageTrendingTopics';
import MinistageVideo from './components/MinistageVideo';
import MinistageChatbot from './components/MinistageChatbot';
import {
  MINISTAGE_AUTHOR,
  MINISTAGE_COMPONENT_ACCORDION,
  MINISTAGE_COMPONENT_GUIDER,
  MINISTAGE_COMPONENT_LISTICLE,
  MINISTAGE_COMPONENT_NEWSLETTER,
  MINISTAGE_COMPONENT_SINGLE_ALERT_TOPIC,
  MINISTAGE_COMPONENT_TEASER,
  MINISTAGE_COMPONENT_TRENDING_TOPICS,
  MINISTAGE_COMPONENT_VIDEO,
  MINISTAGE_SEARCH,
} from '../../../../../../../shared/constants/paragraphs';
import type { MinistageParagraphProps } from './typings';

export const MinistageParagraph = (
  props: MinistageParagraphProps,
): ReactElement | null => {
  if (!props?.ministageParagraph?.ministage?.__typename) {
    return null;
  }

  switch (props.ministageParagraph.ministage.__typename) {
    case MINISTAGE_COMPONENT_GUIDER:
      return (
        <TestFragment data-testid="ministage-paragraph-guider-wrapper">
          <MinistageRechtsratgeber
            ministageGuider={props.ministageParagraph.ministage}
            /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
            origin={props.origin}
            pageLayoutType={props.pageLayoutType}
          />
        </TestFragment>
      );
    case MINISTAGE_COMPONENT_LISTICLE:
      return (
        <TestFragment data-testid="ministage-paragraph-listicle-wrapper">
          <MinistageListicle
            ministageListicle={props.ministageParagraph.ministage}
          />
        </TestFragment>
      );
    case MINISTAGE_COMPONENT_NEWSLETTER:
      return (
        <TestFragment data-testid="ministage-paragraph-newsletter-wrapper">
          <MinistageNewsletter
            ministageNewsletter={props.ministageParagraph.ministage}
            origin={props.origin}
          />
        </TestFragment>
      );
    case MINISTAGE_COMPONENT_TEASER:
      return (
        <TestFragment data-testid="ministage-paragraph-teaser-wrapper">
          <MinistageTeaser
            ministageTeaser={props.ministageParagraph.ministage}
            /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
            origin={props.origin}
          />
        </TestFragment>
      );
    case MINISTAGE_COMPONENT_VIDEO:
      return (
        <TestFragment data-testid="ministage-paragraph-video-wrapper">
          <MinistageVideo
            scrollOffset={props.scrollOffset}
            ministageParagraph={props.ministageParagraph}
            /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
            id={props.id}
            origin={props.origin}
          />
        </TestFragment>
      );
    case MINISTAGE_COMPONENT_ACCORDION:
      return (
        <TestFragment data-testid="ministage-paragraph-video-wrapper">
          <MinistageAccordion
            ministageParagraph={props.ministageParagraph}
            origin={props.origin}
            colStyle={props.colStyle}
          />
        </TestFragment>
      );
    case MINISTAGE_COMPONENT_TRENDING_TOPICS:
      return (
        <TestFragment data-testid="ministage-paragraph-trending-topics-wrapper">
          <MinistageTrendingTopics
            ministageParagraph={props.ministageParagraph}
            origin={props.origin}
          />
        </TestFragment>
      );
    case MINISTAGE_COMPONENT_SINGLE_ALERT_TOPIC:
      return (
        <TestFragment data-testid="ministage-paragraph-single-alert-topic-wrapper">
          <MinistageSingleAlertTopic
            ministageParagraph={props.ministageParagraph}
          />
        </TestFragment>
      );
    case MINISTAGE_AUTHOR:
      return (
        <TestFragment data-testid="ministage-paragraph-author-wrapper">
          <MinistageAuthor
            ministageAuthor={props.ministageParagraph.ministage}
            origin={props.origin}
          />
        </TestFragment>
      );
    case MINISTAGE_SEARCH:
      if (props.ministageParagraph.ministage.searchTypeValue === 'chatbot') {
        return (
          <TestFragment data-testid="ministage-paragraph-search-wrapper">
            <MinistageChatbot
              ministageParagraph={props.ministageParagraph.ministage}
              origin={props.origin}
            />
          </TestFragment>
        );
      } else {
        return (
          <TestFragment data-testid="ministage-paragraph-search-wrapper">
            <MinistageSearch
              ministageParagraph={props.ministageParagraph.ministage}
              origin={props.origin}
            />
          </TestFragment>
        );
      }
    default:
      return null;
  }
};

export default withImpressionTrackingObserver({
  getTrackingId: (props: MinistageParagraphProps) =>
    //@ts-ignore
    //TODO: Remove TS-ignore when we have a working MinistageParagraphUnion type.
    props?.ministageParagraph?.ministage?.headline ||
    props?.ministageParagraph?.ministage?.__typename,
  isTrackingActivated: (props: MinistageParagraphProps) =>
    props?.ministageParagraph?.ministage?.__typename,
})(MinistageParagraph);
