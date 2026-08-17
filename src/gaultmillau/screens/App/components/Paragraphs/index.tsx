import React from 'react';
import ParagraphsRenderer from './components/ParagraphsRenderer';
import { ParagraphProps } from './typings';

export default ({
  pageBody,
  showCap = false,
  applyDataFilter,
  ...props
}: ParagraphProps) => {
  if (!pageBody || !pageBody.length || pageBody.length < 1) {
    return null;
  }

  const body =
    typeof applyDataFilter === 'function'
      ? applyDataFilter(pageBody)
      : pageBody;

  return <ParagraphsRenderer showCap={showCap} {...props} pageBody={body} />;
};
