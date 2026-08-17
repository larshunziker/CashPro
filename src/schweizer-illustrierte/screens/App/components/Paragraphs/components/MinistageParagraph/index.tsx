import React, { ReactElement } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/decorators/componentSwitch'. '/Users/bhs/code */
import createComponentSwitch from '../../../../../../../shared/decorators/componentSwitch';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/decorators/withImpressionTrackingObserver'. ' */
import withImpressionTrackingObserver from '../../../../../../../shared/decorators/withImpressionTrackingObserver';
import HoroscopeStageParagraph from './components/HoroscopeStageParagraph';
import MinistageAccordion from './components/MinistageAccordion';
import MinistageChannelSponsor from './components/MinistageChannelSponsor';
import MinistageSingleAlertTopic from './components/MinistageSingleAlertTopic';
import MinistageTrendingTopics from './components/MinistageTrendingTopics';
import MinistageVideo from './components/MinistageVideo';
import {
  MINISTAGE_CHANNEL_SPONSOR,
  MINISTAGE_COMPONENT_ACCORDION,
  MINISTAGE_COMPONENT_VIDEO,
  MINISTAGE_HOROSCOPES,
  MINISTAGE_SINGLE_ALERT_TOPIC,
  MINISTAGE_TRENDING_TOPICS,
} from '../../../../../../../shared/constants/paragraphs';
import { MinistageParagraphProps } from './typings';

const Switch = createComponentSwitch({
  [MINISTAGE_HOROSCOPES]: HoroscopeStageParagraph,
  [MINISTAGE_COMPONENT_VIDEO]: MinistageVideo,
  [MINISTAGE_CHANNEL_SPONSOR]: MinistageChannelSponsor,
  [MINISTAGE_TRENDING_TOPICS]: MinistageTrendingTopics,
  [MINISTAGE_SINGLE_ALERT_TOPIC]: MinistageSingleAlertTopic,
  [MINISTAGE_COMPONENT_ACCORDION]: MinistageAccordion,
});

const Ministage = ({ ...props }: MinistageParagraphProps): ReactElement => (
  <Switch
    component={props?.ministageParagraph?.ministage?.__typename}
    {...props}
  />
);

export default withImpressionTrackingObserver({
  getTrackingId: (props: MinistageParagraphProps) =>
    props?.ministageParagraph?.ministage?.headline ||
    props?.ministageParagraph?.ministage?.__typename,
  isTrackingActivated: (props: MinistageParagraphProps) =>
    props?.ministageParagraph?.ministage?.__typename,
})(Ministage);
