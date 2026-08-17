import React from 'react';
import compose from 'recompose/compose';
import { QueryHookOptions, useQuery } from '@apollo/client';
import classNames from 'classnames';
import { ensureTeaserInterface } from '../Teaser/shared/helpers';
import { WithPagerStateProps } from '../../../../../shared/decorators/@types/withPagerState';
import withPagePager from '../../../../../shared/decorators/withPagePager';
import withHelmet from '../../../../shared/decorators/withHelmet';
import TeaserGrid from '../TeaserGrid';
import { PAGER_TYPE_PAGE_LOADER, default as Pager } from '../Pager';
import {
  GLOBAL_SEARCH_FILTER_ARTICLE,
  GLOBAL_SEARCH_SORT_BY_MODIFICATION_DATE,
} from '../../../../../shared/constants/globalSearch';
import { GRID_LAYOUT_TEASER_3X4 } from '../TeaserGrid/gridConfigs/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/screens/ */
import { GET_RELATED_TO_CONTENT } from './queries';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { RelatedToContentProps } from './typings';

type RelatedToContentPropsInner = RelatedToContentProps &
  WithPagerStateProps & {
    data?: ApolloData & {
      globalSearch?: SearchableUnionGraphList;
    };
    updatePage: () => void;
  };

const DEFAULT_SORT_FIELD = GLOBAL_SEARCH_SORT_BY_MODIFICATION_DATE;

const RelatedToContent = ({
  title = '',
  page = 1,
  relatedToTitle,
}: RelatedToContentPropsInner) => {
  const apolloConfig: QueryHookOptions = {
    variables: {
      query: `${title}*`,
      pageSize: 9,
      filter: GLOBAL_SEARCH_FILTER_ARTICLE,
      offset: (page - 1) * 9,
      sort: DEFAULT_SORT_FIELD,
    },
    fetchPolicy: 'cache-and-network',
  };

  const { data } = useQuery<QueryRoot>(GET_RELATED_TO_CONTENT, apolloConfig);

  const globalSearch = data?.environment?.globalSearch;

  if (!globalSearch || globalSearch?.edges?.length === 0) {
    return null;
  }

  return (
    <div className={classNames('related-article', styles.Wrapper)}>
      <div className={styles.TitleWrapper} />
      {relatedToTitle && (
        <div className={grid.Container}>
          <div className={styles.RelatedToTitle}>{relatedToTitle}</div>
        </div>
      )}
      <div id="page">
        <TeaserGrid
          layout={GRID_LAYOUT_TEASER_3X4}
          items={ensureTeaserInterface(globalSearch.edges)}
        />
      </div>
      <div className={styles.Pager}>
        <Pager
          itemsCount={globalSearch.count || 0}
          itemsPerPage={9}
          currentPage={page}
          component={PAGER_TYPE_PAGE_LOADER}
          anchorScrollId={'page'}
        />
      </div>
    </div>
  );
};

export default compose<any, any>(
  withPagePager,
  withHelmet({}),
)(RelatedToContent);
