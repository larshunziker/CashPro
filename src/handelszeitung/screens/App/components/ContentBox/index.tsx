import React, { memo } from 'react';
import createComponentSwitch from '../../../../shared/decorators/componentSwitch';
import ContentBoxTab from '../ContentBoxTab';
import MostRead from './components/MostRead';
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

const ContentBox = ({ component, node, origin }: ContentBoxProps) => {
  return <Switch component={component} node={node} origin={origin} />;
};

export default memo<ContentBoxProps>(ContentBox);
