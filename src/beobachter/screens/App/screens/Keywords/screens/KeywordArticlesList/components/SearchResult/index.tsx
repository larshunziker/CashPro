import React, { ReactElement } from 'react';
import { ensureTeaserInterface } from '../../../../../../components/Teaser/shared/helpers';
import TestFragment from '../../../../../../../../../shared/tests/components/TestFragment';
import TeaserGrid from '../../../../../../components/TeaserGrid';
import { GRID_LAYOUT_KEYWORDS } from '../../../../../../components/TeaserGrid/gridConfigs/constants';

export type SearchResultProps = {
  list?: SearchableUnionGraphList;
};

type SearchResultPropsInner = SearchResultProps;

const SearchResult = ({ list }: SearchResultPropsInner): ReactElement => {
  if (!list?.edges || !Array.isArray(list.edges) || list.edges.length === 0) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }
  return (
    <TestFragment data-testid="searchresult-teaserlist-wrapper">
      <TeaserGrid
        layout={GRID_LAYOUT_KEYWORDS}
        items={ensureTeaserInterface(list.edges)}
      />
    </TestFragment>
  );
};

export default SearchResult;
