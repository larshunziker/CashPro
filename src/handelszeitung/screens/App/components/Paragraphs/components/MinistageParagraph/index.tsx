import React, { ReactElement } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/decorators/withImpressionTrackingObserver'. ' */
import withImpressionTrackingObserver from '../../../../../../../shared/decorators/withImpressionTrackingObserver';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import MinistageAccordion from './components/MinistageAccordion';
import MinistageListicle from './components/MinistageListicle';
import MinistageNewsletter from './components/MinistageNewsletter';
import MinistageSingleAlertTopic from './components/MinistageSingleAlertTopic';
import MinistageSocialMedia from './components/MinistageSocialMedia';
import MinistageTeaser from './components/MinistageTeaser';
import MinistageTrendingTopics from './components/MinistageTrendingTopics';
import MinistageVideo from './components/MinistageVideo';
import {
  MINISTAGE_COMPONENT_ACCORDION,
  MINISTAGE_COMPONENT_LISTICLE,
  MINISTAGE_COMPONENT_NEWSLETTER,
  MINISTAGE_COMPONENT_SINGLE_ALERT_TOPIC,
  MINISTAGE_COMPONENT_SOCIAL_MEDIA,
  MINISTAGE_COMPONENT_TEASER,
  MINISTAGE_COMPONENT_TRENDING_TOPICS,
  MINISTAGE_COMPONENT_VIDEO,
} from '../../../../../../../shared/constants/paragraphs';
import { MinistageParagraphProps } from './typings';

export const MinistageParagraph = (
  props: MinistageParagraphProps,
): ReactElement | null => {
  if (!props?.ministageParagraph?.ministage?.__typename) {
    return null;
  }

  switch (props.ministageParagraph.ministage.__typename) {
    case MINISTAGE_COMPONENT_NEWSLETTER:
      return (
        <TestFragment data-testid="ministage-paragraph-newsletter-wrapper">
          <MinistageNewsletter
            ministageNewsletter={props.ministageParagraph.ministage}
            origin={props.origin}
            isSplittedPageLayout={props.isSplittedPageLayout}
          />
        </TestFragment>
      );
    case MINISTAGE_COMPONENT_TEASER:
      return (
        <TestFragment data-testid="ministage-paragraph-teaser-wrapper">
          <MinistageTeaser
            ministageTeaser={props.ministageParagraph.ministage}
            isSplittedPageLayout={props.isSplittedPageLayout}
          />
        </TestFragment>
      );
    case MINISTAGE_COMPONENT_SOCIAL_MEDIA:
      return (
        <TestFragment data-testid="ministage-paragraph-socialmedia-wrapper">
          <MinistageSocialMedia
            ministageSocialMedia={props.ministageParagraph.ministage}
            isSplittedPageLayout={props.isSplittedPageLayout}
          />
        </TestFragment>
      );
    case MINISTAGE_COMPONENT_VIDEO:
      return (
        <TestFragment data-testid="ministage-paragraph-video-wrapper">
          {/* TODO: Remove TS-ignore when we have a working MinistageParagraphUnion type
          //@ts-ignore */}
          <MinistageVideo {...props} />
        </TestFragment>
      );
    case MINISTAGE_COMPONENT_ACCORDION:
      return (
        <TestFragment data-testid="ministage-paragraph-accordion-wrapper">
          <MinistageAccordion
            ministageParagraph={props.ministageParagraph}
            origin={props.origin}
            colStyle={props.colStyle}
            isSplittedPageLayout={props.isSplittedPageLayout}
          />
        </TestFragment>
      );
    case MINISTAGE_COMPONENT_TRENDING_TOPICS:
      return (
        <TestFragment data-testid="ministage-paragraph-trending-topics-wrapper">
          <MinistageTrendingTopics
            ministageParagraph={props.ministageParagraph}
            isSplittedPageLayout={props.isSplittedPageLayout}
          />
        </TestFragment>
      );
    case MINISTAGE_COMPONENT_SINGLE_ALERT_TOPIC:
      return (
        <TestFragment data-testid="ministage-paragraph-single-alert-topic-wrapper">
          <MinistageSingleAlertTopic
            ministageParagraph={props.ministageParagraph}
            isSplittedPageLayout={props.isSplittedPageLayout}
          />
        </TestFragment>
      );
    case MINISTAGE_COMPONENT_LISTICLE:
      return (
        <TestFragment data-testid="ministage-paragraph-listicle-wrapper">
          <MinistageListicle ministageParagraph={props.ministageParagraph} />
        </TestFragment>
      );
    default:
      return null;
  }
};

export default withImpressionTrackingObserver({
  getTrackingId: (props: MinistageParagraphProps) =>
    // @ts-ignore
    props?.ministageParagraph?.ministage?.headline ||
    props?.ministageParagraph?.ministage?.__typename,
  isTrackingActivated: (props: MinistageParagraphProps) =>
    props?.ministageParagraph?.ministage?.__typename,
})(MinistageParagraph);
