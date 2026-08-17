import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ensureTeaserInterface } from '../../../../../../components/Teaser/shared/helpers';
import Error from '../../../../../../components/Error';
import TeaserPortfolioNewsSkeleton from '../../../../../../components/Teaser/components/TeaserPortfolioNews/components/TeaserPortfolioNewsSkeleton';
import TeaserGrid from '../../../../../../components/TeaserGrid';
import Pager, {
  PAGER_TYPE_PAGE_LOADER_MEMORY,
} from '../../../../../../components/Pager';
import { ITEMS_PER_PAGE, portfolioNewsApolloConfig } from './apolloConfig';
import { GRID_LAYOUT_PORTFOLIO_NEWS } from '../../../../../../components/TeaserGrid/gridConfigs/constants';
import styles from './styles.legacy.css';

type PortfolioNewsProps = {
  valorList: string[];
};

const PortfolioNews = ({ valorList }: PortfolioNewsProps) => {
  const [page, setPage] = useState(1);

  const apolloConfig: Record<string, any> = {
    valors: valorList,
    page,
  };

  const { query, ...options } = portfolioNewsApolloConfig.options({
    params: apolloConfig,
  });

  const { data, error, loading } = useQuery(query, options);

  if (error) {
    return __DEVELOPMENT__ ? (
      <Error msg={`Something went wrong: ${error}`} />
    ) : null;
  }

  const portfolioNewsCount = data?.environment?.globalSearch?.count;
  const totalPortfolioNewsPages = Math.ceil(
    portfolioNewsCount / ITEMS_PER_PAGE,
  );

  const remainingItemsOnCurrentPage = portfolioNewsCount % ITEMS_PER_PAGE;
  const skeletonTeaserCount =
    page === totalPortfolioNewsPages
      ? remainingItemsOnCurrentPage
      : ITEMS_PER_PAGE;

  const itemList = data?.environment?.globalSearch?.edges;

  return (
    <div id="portfolio-news">
      <h2 className={styles.Title}>Portfolio News</h2>

      {(valorList?.length === 0 ||
        data?.environment?.globalSearch === null ||
        itemList?.length === 0) && <div>Keine Nachrichten</div>}

      {loading && (
        <div className={styles.PortfolioNewsWrapper}>
          <TeaserPortfolioNewsSkeleton count={skeletonTeaserCount} />
        </div>
      )}

      {data?.environment?.globalSearch !== null && itemList?.length > 0 && (
        <>
          <div className={styles.PortfolioNewsWrapper}>
            <TeaserGrid
              layout={GRID_LAYOUT_PORTFOLIO_NEWS}
              items={ensureTeaserInterface(itemList)}
            />
          </div>
          {(portfolioNewsCount > ITEMS_PER_PAGE && (
            <Pager
              key={`${portfolioNewsCount}-pager`}
              itemsCount={portfolioNewsCount || 0}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={page}
              component={PAGER_TYPE_PAGE_LOADER_MEMORY}
              handleClick={setPage}
              anchorScrollId="portfolio-news"
            />
          )) ||
            null}
        </>
      )}
    </div>
  );
};

export default PortfolioNews;
