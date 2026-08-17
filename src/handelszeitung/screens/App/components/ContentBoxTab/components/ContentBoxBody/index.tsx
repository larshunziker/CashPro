import React, { ReactElement, memo } from 'react';
import createComponentSwitch from '../../../../../../shared/decorators/componentSwitch';
import MostReadBody from './components/MostReadBody';
import NewestBody from './components/NewestBody';
import { TabItem } from '../../../../../../../common/components/ContentBoxTab/components/Tab';
import {
  CONTENT_SOURCE_MOST_READ,
  CONTENT_SOURCE_NEWEST,
} from '../../../../../../../shared/constants/content';

const Switch = createComponentSwitch({
  [CONTENT_SOURCE_MOST_READ]: MostReadBody,
  [CONTENT_SOURCE_NEWEST]: NewestBody,
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
