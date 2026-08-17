/**
 * @file   ministage paragraph
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2016-11-16
 *
 */

import React from 'react';
import withImpressionTrackingObserver from 'decorators/withImpressionTrackingObserver';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import MinistageDisruptor from './components/MinistageDisruptor';
import MinistageNewsletter from 'Paragraphs/components/MinistageParagraph/components/MinistageNewsletter';
import MinistageTeaser from 'Paragraphs/components/MinistageParagraph/components/MinistageTeaser';

import MinistageVideo from 'Paragraphs/components/MinistageParagraph/components/MinistageVideo';
import {
  MINISTAGE_COMPONENT_DISRUPTOR,
  MINISTAGE_COMPONENT_NEWSLETTER,
  MINISTAGE_COMPONENT_TEASER,
  MINISTAGE_COMPONENT_VIDEO,
} from 'constants/paragraphs';

export const MinistageParagraph = (props) => {
  if (!props?.ministageParagraph?.ministage?.__typename) {
    return null;
  }
  switch (props.ministageParagraph.ministage.__typename) {
    case MINISTAGE_COMPONENT_NEWSLETTER:
      return (
        <TestFragment data-testid="ministage-paragraph-newsletter-wrapper">
          <MinistageNewsletter
            ministageNewsletter={props.ministageParagraph.ministage}
          />
        </TestFragment>
      );
    case MINISTAGE_COMPONENT_TEASER:
      return (
        <TestFragment data-testid="ministage-paragraph-teaser-wrapper">
          <MinistageTeaser
            ministageTeaser={props.ministageParagraph.ministage}
          />
        </TestFragment>
      );
    case MINISTAGE_COMPONENT_DISRUPTOR:
      return (
        <TestFragment data-testid="ministage-paragraph-disruptor-wrapper">
          <MinistageDisruptor
            ministageDisruptor={props.ministageParagraph.ministage}
          />
        </TestFragment>
      );
    case MINISTAGE_COMPONENT_VIDEO:
      return (
        <TestFragment data-testid="ministage-paragraph-video-wrapper">
          <MinistageVideo {...props} />
        </TestFragment>
      );
    default:
      return null;
  }
};

export default withImpressionTrackingObserver({
  getTrackingId: (props) =>
    props?.ministageParagraph?.ministage?.headline ||
    props?.ministageParagraph?.ministage?.__typename,
  isTrackingActivated: (props) =>
    props?.ministageParagraph?.ministage?.__typename,
})(MinistageParagraph);
