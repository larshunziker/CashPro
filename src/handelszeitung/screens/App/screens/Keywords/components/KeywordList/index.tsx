import React, { ReactElement } from 'react';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import ElementList from '../../../../components/TermsOverview/components/ElementList';

export type SearchResultProps = {
  list?: KeywordGraphList;
};

const KeywordList = ({ list = {} }: SearchResultProps): ReactElement => {
  if (
    !list ||
    !list.edges ||
    !Array.isArray(list.edges) ||
    !list.edges.length
  ) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  return (
    <TestFragment data-testid="keywordlist-elementlist-wrapper">
      <ElementList
        /* @ts-ignore TODO: TS2322 ->  Type '(Keyword | undefined)[]' is not assignable to type 'ElementItem[]'. */
        data={list.edges.filter((edge) => !!edge.node).map((edge) => edge.node)}
      />
    </TestFragment>
  );
};

export default KeywordList;
