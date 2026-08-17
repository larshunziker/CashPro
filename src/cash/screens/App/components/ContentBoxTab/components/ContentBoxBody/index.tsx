import React, { ReactElement, memo } from 'react';
import createComponentSwitch from '../../../../../../shared/decorators/componentSwitch';
import LatestNewsByValors from './components/LatestNewsByValors';
import MostReadBody from './components/MostReadBody';
import NewestBody from './components/NewestBody';
import { TabItem } from '../../../../../../../common/components/ContentBoxTab/components/Tab';
import {
  CONTENT_SOURCE_MOST_READ,
  CONTENT_SOURCE_NEWEST,
} from '../../../../../../../shared/constants/content';
import { CONTENT_SOURCE_LATEST_NEWS_BY_VALORS } from './constants';

const Switch = createComponentSwitch({
  [CONTENT_SOURCE_MOST_READ]: MostReadBody,
  [CONTENT_SOURCE_NEWEST]: NewestBody,
  [CONTENT_SOURCE_LATEST_NEWS_BY_VALORS]: LatestNewsByValors,
});

export type ContentBoxBodyProps = {
  component: string;
  currentTab: TabItem;
  body: ParagraphInterface;
};

const ContentBoxTab = ({
  component,
  body,
  currentTab,
}: ContentBoxBodyProps): ReactElement => {
  return <Switch component={component} body={body} currentTab={currentTab} />;
};

export default memo<ContentBoxBodyProps>(ContentBoxTab);
