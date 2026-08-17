import React, { ReactElement, memo } from 'react';
import createComponentSwitch from '../../../../shared/decorators/componentSwitch';
import ContentBoxTab from '../ContentBoxTab';
import MostRead from './components/MostRead';
import SingleTeaser from './components/SingleTeaser';
import Ticker from './components/Ticker';
import {
  CONTENT_SOURCE_MANUAL,
  CONTENT_SOURCE_MANUAL_RANDOM,
  CONTENT_SOURCE_MOST_READ,
  CONTENT_SOURCE_TABS,
  CONTENT_SOURCE_TICKER,
} from '../../../../../shared/constants/content';
import { ContentBoxProps } from '../../../../../common/components/ContentBox/typings';

const Switch = createComponentSwitch({
  [CONTENT_SOURCE_MOST_READ]: MostRead,
  [CONTENT_SOURCE_MANUAL]: MostRead,
  [CONTENT_SOURCE_MANUAL_RANDOM]: MostRead,
  [CONTENT_SOURCE_TICKER]: Ticker,
  [CONTENT_SOURCE_TABS]: ContentBoxTab,
});

const ContentBox = ({
  component,
  node,
  origin,
}: ContentBoxProps): ReactElement => {
  // INFO: on full quote pages the editor has the possibility to display a single teaser (Native Advertising with reference to current valor). Use a fixed item in the entity queue and check the "useNativeAdvertising" flag and select a content box. The first NA with the referenced valor that was found, will be displayed a s a teaser on the fullqoute page.
  if (node?.useNativeAdvertising) {
    return <SingleTeaser />;
  }

  return <Switch component={component} node={node} origin={origin} />;
};

export default memo<ContentBoxProps>(ContentBox);
