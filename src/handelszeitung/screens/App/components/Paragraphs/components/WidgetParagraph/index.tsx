import React from 'react';
import Widgets from '../../../Widgets';
import { WIDGET_JOB_SEARCH } from '../../../Widgets/constants';
import { WidgetParagraphProps, WidgetParagraphType } from './typings';

const WidgetParagraph = ({ widgetParagraph }: WidgetParagraphProps) => {
  const widgetParagraphCopy: WidgetParagraphType = JSON.parse(
    JSON.stringify(widgetParagraph),
  );

  if (!widgetParagraphCopy?.link?.path) {
    return null;
  }

  if (widgetParagraphCopy.link.path.includes('/job-search/')) {
    return (
      <Widgets
        component={WIDGET_JOB_SEARCH}
        widgetParagraph={widgetParagraphCopy}
      />
    );
  }
  return <></>;
};

export default WidgetParagraph;
