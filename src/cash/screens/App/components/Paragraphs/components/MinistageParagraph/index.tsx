import React, { ReactElement } from 'react';
import classNames from 'classnames';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/decorators/withImpressionTrackingObserver'. ' */
import withImpressionTrackingObserver from '../../../../../../../shared/decorators/withImpressionTrackingObserver';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import MinistageAccordion from './components/MinistageAccordion';
import MinistageLogoBox from './components/MinistageLogoBox';
import MinistageNewsletter from './components/MinistageNewsletter';
import MinistageSingleAlertTopic from './components/MinistageSingleAlertTopic';
import MinistageTeaser from './components/MinistageTeaser';
import MinistageTrendingTopics from './components/MinistageTrendingTopics';
import {
  MINISTAGE_COMPONENT_ACCORDION,
  MINISTAGE_COMPONENT_LOGO_BOX,
  MINISTAGE_COMPONENT_NEWSLETTER,
  MINISTAGE_COMPONENT_SINGLE_ALERT_TOPIC,
  MINISTAGE_COMPONENT_TEASER,
  MINISTAGE_COMPONENT_TRENDING_TOPICS,
} from '../../../../../../../shared/constants/paragraphs';
import { LANDING_PAGE_TYPE } from '../../../../screens/LandingPage/constants';
import {
  PAGESCREEN_DEFAULT_TYPE,
  PAGESCREEN_MARKETING_TYPE,
} from '../../../../screens/PageScreen/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './defaultStyles.legacy.css';
import { MinistageParagraphProps } from './typings';

export const MinistageParagraph = (
  props: MinistageParagraphProps,
): ReactElement | null => {
  if (!props?.ministageParagraph?.ministage?.__typename) {
    return null;
  }

  const useFullwidthBackground =
    props.origin === LANDING_PAGE_TYPE ||
    props.origin === PAGESCREEN_MARKETING_TYPE ||
    props.origin === PAGESCREEN_DEFAULT_TYPE;

  switch (props.ministageParagraph.ministage.__typename) {
    case MINISTAGE_COMPONENT_NEWSLETTER:
      return (
        <TestFragment data-testid="ministage-paragraph-newsletter-wrapper">
          <div
            className={classNames(
              {
                [styles.FullWidthBackground]: useFullwidthBackground,
              },
              styles.Wrapper,
            )}
          >
            <div
              className={classNames({
                [grid.Container]: useFullwidthBackground,
              })}
            >
              <MinistageNewsletter
                ministageNewsletter={props.ministageParagraph.ministage}
                useFullwidthBackground={useFullwidthBackground}
              />
            </div>
          </div>
        </TestFragment>
      );
    case MINISTAGE_COMPONENT_TEASER:
      return (
        <TestFragment data-testid="ministage-paragraph-teaser-wrapper">
          <div
            className={classNames(
              {
                [styles.FullWidthBackground]: useFullwidthBackground,
              },
              styles.Wrapper,
            )}
          >
            <div
              className={classNames({
                [grid.Container]: useFullwidthBackground,
              })}
            >
              <MinistageTeaser
                ministageTeaser={props.ministageParagraph.ministage}
                useFullwidthBackground={useFullwidthBackground}
              />
            </div>
          </div>
        </TestFragment>
      );
    case MINISTAGE_COMPONENT_TRENDING_TOPICS:
      return (
        <TestFragment data-testid="ministage-paragraph-trending-topics-wrapper">
          <div
            className={classNames(
              {
                [grid.Container]: useFullwidthBackground,
              },
              styles.Wrapper,
            )}
          >
            <MinistageTrendingTopics
              ministageParagraph={props.ministageParagraph}
            />
          </div>
        </TestFragment>
      );
    case MINISTAGE_COMPONENT_ACCORDION:
      return (
        <TestFragment data-testid="ministage-paragraph-accordion-wrapper">
          <div
            className={classNames({ [grid.Container]: useFullwidthBackground })}
          >
            <MinistageAccordion
              ministageParagraph={props.ministageParagraph}
              origin={props.origin}
              colStyle={props.colStyle}
            />
          </div>
        </TestFragment>
      );
    case MINISTAGE_COMPONENT_LOGO_BOX:
      return (
        <TestFragment data-testid="ministage-paragraph-logo-box-wrapper">
          <div
            className={classNames({ [grid.Container]: useFullwidthBackground })}
          >
            <MinistageLogoBox
              ministageParagraph={props.ministageParagraph}
              isShuffleEnabled
            />
          </div>
        </TestFragment>
      );
    case MINISTAGE_COMPONENT_SINGLE_ALERT_TOPIC:
      return (
        <TestFragment data-testid="ministage-paragraph-single-alert-topic-wrapper">
          <div
            className={classNames({ [grid.Container]: useFullwidthBackground })}
          >
            <MinistageSingleAlertTopic
              ministageParagraph={props.ministageParagraph}
            />
          </div>
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
