import React from 'react';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import ElementList from '../../../../components/TermsOverview/components/ElementList';
import { EntriesListProps } from './typings';

const EntriesList = ({ list = {} }: EntriesListProps) => {
  if (
    !list ||
    !list.edges ||
    !Array.isArray(list.edges) ||
    !list.edges.length
  ) {
    return null;
  }

  return (
    <TestFragment data-testid="entrylist-elementlist-wrapper">
      <ElementList
        data={
          list.edges &&
          list.edges
            .map(({ node }) => ({
              label: node?.title || '',
              preferredUri: node?.target?.preferredUri || '',
            }))
            .filter((element) => !!(element.label && element.preferredUri))
        }
      />
    </TestFragment>
  );
};

export default EntriesList;
