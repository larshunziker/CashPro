import React, { ReactElement } from 'react';
import { markLastListicle } from '../../../../../shared/helpers/markLastListicle';
import ParagraphsRenderer from './components/ParagraphsRenderer';
import { ParagraphsRendererProps } from './components/ParagraphsRenderer/typings';

const Paragraphs = ({
  pageBody,
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

  return <ParagraphsRenderer {...props} pageBody={body} />;
};

export default Paragraphs;
