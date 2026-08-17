import React from 'react';
import { renderToString } from 'react-dom/server';
import compose from 'recompose/compose';
import classNames from 'classnames';
import pageTemplateFactory from '../../../../../common/screens/PageTemplate/factory';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { ensureTeaserInterface } from '../../components/Teaser/shared/helpers';
import withParams from '../../../../../shared/decorators/withParams';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import { setStatusCode } from '../../../../../shared/actions/ssr';
import Helmet from '../../components/Helmet';
import SearchForm from '../../components/SearchForm';
import TeaserGrid from '../../components/TeaserGrid';
import Aside from './components/Aside';
import NothingFound from './components/NothingFound';
import SearchFilters from './components/SearchFilters';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../components/Pager';
import Link from '../../../../../common/components/Link';
import {
  NATIVE_ADVERTISING_CONTENT_TYPE,
  PRODUCT_CONTENT_TYPE,
} from '../../../../../shared/constants/content';
import {
  ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE,
  ROOT_SCHEMA_TYPE_WEB_PAGE,
} from '../../../../../shared/constants/structuredData';
import { GRID_LAYOUT_TEASER_1X18 } from '../../components/TeaserGrid/gridConfigs/constants';
import { SITE_TITLE } from '../../constants';
import { ITEMS_PER_PAGE } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { SearchProps } from './typings';

type SearchPropsInner = SearchProps & {
  data: {
    contentSearch: {
      items: {};
      count: number;
      suggestion: string;
      facets: { name: string; count: number }[];
    };
  };
  query: string;
};

const PageTemplateFactory = pageTemplateFactory({
  styles: {
    Wrapper: grid.Container,
    MainContent: classNames(grid.ColXs24, grid.ColMd15, grid.ColXl16),
    AsideContent: classNames(grid.ColXs24, grid.ColMd9, grid.ColXl8),
  },
});
const FallBackCta = () => <div className={styles.CallToAction}>Mehr Infos</div>;

const Search = ({ data, page, loading, query }: SearchPropsInner) => {
  const contentSearch = data?.contentSearch;

  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  const hasResults = contentSearch?.count > 0;
  const suggestion = contentSearch?.suggestion;
  let items = null;

  const fallBackCtaToButton = renderToString(<FallBackCta />);

  if (Array.isArray(contentSearch.items) && contentSearch.items.length > 0) {
    items = ensureTeaserInterface(contentSearch.items).map((node: any) => {
      node.__typename = node.type;

      if (node.type === NATIVE_ADVERTISING_CONTENT_TYPE) {
        node.advertisingTypeLabel = node.subtypeValue;
      }
      if (node.type === PRODUCT_CONTENT_TYPE) {
        node.summary = node.description
          ? node.description
          : fallBackCtaToButton;
      }
      if (node.authors) {
        const authors = {
          edges: node.authors.map((author: string) => {
            return {
              node: {
                name: author,
              },
            };
          }),
        };
        return {
          ...node,
          authors,
        };
      }
      return node;
    });
  }

  return (
    <div className="search-page" data-testid="search-page">
      <Helmet
        title={`${query} | ${SITE_TITLE}`}
        socialMetaValues={{
          field_short_title: query,
          field_short_description: query,
          field_heroimage: '',
          field_lead: query,
        }}
        meta={[
          {
            name: 'robots',
            content: ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE,
          },
        ]}
      />
      <div className={classNames(grid.Container, styles.SearchContainer)}>
        <SearchForm initialQuery={query} placeholder="Suche" />
      </div>
      {suggestion && (
        <div className={classNames(styles.Suggestion, grid.Container)}>
          Ergebnisse für:{' '}
          <Link
            className={styles.SuggestionQuery}
            path={`/suche/all/${suggestion}`}
          >
            {suggestion}
          </Link>
        </div>
      )}
      <SearchFilters facets={contentSearch.facets} />
      <div className="search-page" data-testid="search-page">
        <PageTemplateFactory
          /* @ts-ignore TODO: TS2322 ->  Type 'Element' is not assignable to type 'null | undefined'. */
          asideContent={<Aside hideAsideContent={!hasResults} />}
        >
          {hasResults && items ? (
            <div data-testid="search-results-container">
              <div
                className={classNames('search-result', styles.ResultsWrapper)}
                data-testid="searchresult-wrapper"
              >
                <TeaserGrid layout={GRID_LAYOUT_TEASER_1X18} items={items} />
              </div>
              <div className={styles.PagerWrapper}>
                <Pager
                  key={`search-result-pager-${query}`}
                  component={PAGER_TYPE_PAGE_LOADER}
                  currentPage={page}
                  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                  itemsCount={contentSearch.count}
                  itemsPerPage={ITEMS_PER_PAGE}
                />
              </div>
            </div>
          ) : (
            (!loading && (
              <NothingFound setStatusCode={setStatusCode} query={query} />
            )) ||
            null
          )}
        </PageTemplateFactory>
      </div>
    </div>
  );
};

export default compose<any, any>(
  withParams,
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps) => mapProps?.data?.contentSearch?.count || 0,
    pageSize: ITEMS_PER_PAGE,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodes: (mapProps) => mapProps?.data?.contentSearch?.items || [],
  }),
  withAppNexus({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTrackingData: (props) =>
      parseTrackingData({
        ...props,
        articleType: 'LandingPage',
        contentType: 'Search',
        articleId: `search_${props.query}`,
        subsection: props.query,
      }),
  }),
)(Search);
