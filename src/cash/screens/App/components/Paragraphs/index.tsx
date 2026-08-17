import React, { ReactElement } from 'react';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import ParagraphsRenderer from './components/ParagraphsRenderer';
import { markLastListicle } from '../../../../../shared/helpers/markLastListicle';
import { ParagraphsRendererProps } from './components/ParagraphsRenderer/typings';

const Paragraphs = ({
  pageBody,
  showCap = false,
  applyDataFilter,
  ...props
}: ParagraphsRendererProps): ReactElement => {
  if (!pageBody || !pageBody.length || pageBody.length < 1) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  const body =
    typeof applyDataFilter === 'function'
      ? applyDataFilter(pageBody)
      : pageBody;

  markLastListicle(body);

  return (
    <TestFragment data-testid="paragraphs-wrapper">
      <ParagraphsRenderer showCap={showCap} {...props} pageBody={body} />
    </TestFragment>
  );
};

export default Paragraphs;
