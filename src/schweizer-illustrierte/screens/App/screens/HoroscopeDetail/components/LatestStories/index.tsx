import React from 'react';
import { useQuery } from '@apollo/client';
import Recommendations from '../../../../components/Recommendations';
import useInView from '../../../../../../../shared/hooks/useInView';
import {
  ARTICLE_CONTENT_TYPE,
  IMAGE_GALLERY_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import { GLOBAL_SEARCH_SORT_BY_PUBLICATION_DATE } from '../../../../../../../shared/constants/globalSearch';
import { DEFAULT_PUBLICATION, ROUTE_LATEST } from '../../../../constants';
import { TEASER_LAYOUT_S } from '../../../../../../../shared/constants/teaser';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries.js'. '/Users/bhs/code/work/rasch-stack/src/schweizer-illustrier */
import { GET_LATEST_STORIES } from './queries.js';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';

const gqlVariables = {
  contentTypes: [
    ARTICLE_CONTENT_TYPE,
    IMAGE_GALLERY_CONTENT_TYPE,
    VIDEO_CONTENT_TYPE,
  ],
  limit: 4,
  publication: DEFAULT_PUBLICATION,
  sort: GLOBAL_SEARCH_SORT_BY_PUBLICATION_DATE,
};

type LatestStoriesQueryProps = {
  environment: {
    latestStories: {
      edges: SearchableUnionEdge[];
    };
  };
};

const LatestStories = () => {
  const { setRef, isInView } = useInView({
    rootMargin: '200px',
    triggerOnce: true,
  });

  const { data, loading, error } = useQuery<LatestStoriesQueryProps>(
    GET_LATEST_STORIES,
    {
      variables: gqlVariables,
      skip: !isInView,
    },
  );

  return (
    <>
      {/* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */}
      <div ref={setRef} />

      {(!loading || !error) && data && (
        <div className={grid.Container} data-testid="latest-stories-container">
          <Recommendations
            items={data.environment?.latestStories?.edges}
            title="Latest stories"
            titleLinkPath={`/${ROUTE_LATEST}`}
            teaserLayout={TEASER_LAYOUT_S}
          />
        </div>
      )}
    </>
  );
};

export default LatestStories;
