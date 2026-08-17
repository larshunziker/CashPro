import React, { ReactElement } from 'react';
import { useQuery } from '@apollo/client';
import { ensureTeaserInterfaceItem } from '../Teaser/shared/helpers';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import TeaserGrid from './../TeaserGrid';
import { LatestHeadlessStoriesProps } from './typings.js';
import { GRID_LAYOUT_LATEST_HEADLESS } from '../TeaserGrid/gridConfigs/constants';
import { PUBLICATION_GROUP_HZ } from './../../../../../shared/constants/publications';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/screens/ */
import { GET_LATEST_HEADLESS_STORIES } from './queries';
import styles from './styles.legacy.css';

export type LatestHeadlessStoriesPropsInner = LatestHeadlessStoriesProps;

type LatestHeadlessStoriesQueryProps = {
  environment: {
    latestHeadlessStories: {
      edges: SearchableUnionEdge[];
    };
  };
};

const LatestHeadlessStories = ({
  publication = PUBLICATION_GROUP_HZ,
}: LatestHeadlessStoriesPropsInner): ReactElement => {
  const gqlVariables = {
    limit: 4,
    publication,
  };

  const { data, loading, error } = useQuery<LatestHeadlessStoriesQueryProps>(
    GET_LATEST_HEADLESS_STORIES,
    {
      variables: gqlVariables,
    },
  );

  if (
    loading ||
    error ||
    !data ||
    !data?.environment?.latestHeadlessStories?.edges ||
    !Array.isArray(data.environment.latestHeadlessStories.edges) ||
    data.environment.latestHeadlessStories.edges.length === 0
  ) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  return (
    <div className={styles.Wrapper}>
      <TestFragment data-testid="latest-headless-stories-wrapper">
        <TeaserGrid
          layout={GRID_LAYOUT_LATEST_HEADLESS}
          items={data.environment.latestHeadlessStories.edges.map((item) => {
            return ensureTeaserInterfaceItem(item.node);
          })}
        />
      </TestFragment>
    </div>
  );
};

export default LatestHeadlessStories;
