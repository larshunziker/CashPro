import React, { ReactElement } from 'react';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import ParagraphsRenderer from './components/ParagraphsRenderer';
import { markLastListicle } from '../../../../../shared/helpers/markLastListicle';
import type { ParagraphsProps } from './typings';

export type ParagraphsPropsInner = ParagraphsProps;

const Paragraphs = ({ ...props }: ParagraphsPropsInner): ReactElement => {
  if (!props.pageBody || !props.pageBody.length || props.pageBody.length < 1) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  markLastListicle(props.pageBody);

  return (
    <TestFragment data-testid="paragraphs-wrapper">
      <ParagraphsRenderer {...props} />
    </TestFragment>
  );
};

export default Paragraphs;
