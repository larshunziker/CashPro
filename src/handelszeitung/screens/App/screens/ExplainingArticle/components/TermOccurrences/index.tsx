import React from 'react';
import { useQuery } from '@apollo/client';
import { ensureTeaserInterface } from '../../../../components/Teaser/shared/helpers';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import TeaserGrid from '../../../../components/TeaserGrid';
import { apolloConfig } from './apolloConfig';
import { GRID_LAYOUT_TEASER_3X2 } from '../../../../components/TeaserGrid/gridConfigs/constants';
import sections from '../../../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { TermOccurrencesProps } from './typings';

const TermOccurrences = ({ term }: TermOccurrencesProps) => {
  const queryConfig = apolloConfig.options({ location: {}, params: { term } });
  const { data, error, loading } = useQuery(queryConfig.query, {
    variables: queryConfig.variables,
  });

  if (
    loading ||
    error ||
    !data ||
    !data?.environment?.globalSearch?.edges ||
    !Array.isArray(data.environment.globalSearch.edges) ||
    data.environment.globalSearch.edges.length === 0
  ) {
    return null;
  }

  return (
    <>
      <div className={styles.InnerTop} />

      <div
        className={styles.TeaserHeaderWrapper}
        data-testid="term-occurrences-header-wrapper"
      >
        <div className={sections.Container}>
          <div
            className={styles.Title}
            data-testid="term-occurrences-header-title"
          >
            Artikel mit dem Begriff
          </div>

          <div className={styles.Header} data-testid="term-occurrences-header">
            {term}
          </div>
        </div>
      </div>

      <TestFragment data-testid="term-occurrences-teaserlist-wrapper">
        <TeaserGrid
          layout={GRID_LAYOUT_TEASER_3X2}
          items={ensureTeaserInterface(data.environment.globalSearch.edges)}
        />
      </TestFragment>
    </>
  );
};

export default TermOccurrences;
