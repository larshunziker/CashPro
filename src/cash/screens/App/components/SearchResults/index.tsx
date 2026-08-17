import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import Link from '../../../../../common/components/Link';
import SearchCategoryFilter from '../../components/SearchCategoryFilter';
import EsiRenderer from '../EsiRenderer';
import Teaser from '../Teaser';
import SortOrder from './components/SortOrder';
import Table from './components/Table';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../Pager';
import { TEASER_LAYOUT_M } from '../../../../../shared/constants/teaser';
import { PAGE_SIZE } from '../../screens/SearchCategory/constants';
import { categories } from '../SearchCategoryFilter/constants';
import { SCREEN_SEARCH_RESULTS } from './constants';
import styles from './styles.legacy.css';
import { SearchResultsProps } from './typings';

// These classes are used for the css grid
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [styles.Item0, styles.Item1, styles.Item2];

// find the category by id from categories
const findCategory = (id: string) => {
  return categories.find((category) => category.id === id);
};

const SearchResults = ({
  category,
  data,
  searchQuery,
  page,
}: SearchResultsProps) => {
  const { textSearch, environment, wikifolio, newEmission } = data;
  const hasIndex =
    textSearch?.index?.items && textSearch?.index?.items.length > 0;
  const hasEquity =
    textSearch?.equity?.items && textSearch?.equity?.items.length > 0;
  const hasNews = Boolean(environment?.globalSearch?.count || 0);
  const hasFund = textSearch?.fund?.items && textSearch?.fund?.items.length > 0;
  const hasDerivative =
    textSearch?.derivative?.items && textSearch?.derivative?.items.length > 0;
  const hasDiverse =
    textSearch?.diverse?.items && textSearch?.diverse?.items.length > 0;
  const hasCryptoCurrency =
    textSearch?.cryptoCurrency?.items &&
    textSearch?.cryptoCurrency?.items.length > 0;
  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  const hasNewEmission = newEmission?.count > 0;
  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  const hasWikifolio = wikifolio?.count > 0;
  const hasBond = textSearch?.bond?.items && textSearch?.bond?.items.length > 0;

  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );
  let pagerDataCount = null;

  const categoryCountOverview = {
    newsCount: environment?.globalSearch?.count,
    indexCount: textSearch?.index?.count,
    equityCount: textSearch?.equity?.count,
    fundCount: textSearch?.fund?.count,
    derivateCount: textSearch?.derivative?.count,
    diverseCount: textSearch?.diverse?.count,
    cryptoCurrencyCount: textSearch?.cryptoCurrency?.count,
    bondCount: textSearch?.bond?.count,
    newEmissionCount: newEmission?.count,
    wikifolioCount: wikifolio?.count,
  };

  if (category === 'news' && hasNews) {
    pagerDataCount = categoryCountOverview.newsCount;
  } else if (category === 'index' && hasIndex) {
    pagerDataCount = categoryCountOverview.indexCount;
  } else if (category === 'aktien' && hasEquity) {
    pagerDataCount = categoryCountOverview.equityCount;
  } else if (category === 'fonds' && hasFund) {
    pagerDataCount = categoryCountOverview.fundCount;
  } else if (category === 'derivate' && hasDerivative) {
    pagerDataCount = categoryCountOverview.derivateCount;
  } else if (category === 'diverse' && hasDiverse) {
    pagerDataCount = categoryCountOverview.diverseCount;
  } else if (category === 'kryptowaehrungen' && hasCryptoCurrency) {
    pagerDataCount = categoryCountOverview.cryptoCurrencyCount;
  } else if (category === 'neuemissionen' && hasNewEmission) {
    pagerDataCount = categoryCountOverview.newEmissionCount;
  } else if (category === 'bonds' && hasBond) {
    pagerDataCount = categoryCountOverview.bondCount;
  } else if (category === 'wikifolio' && hasWikifolio) {
    pagerDataCount = categoryCountOverview.wikifolioCount;
  }

  return (
    <div>
      <div className={styles.CategoriesWrapper}>
        <SearchCategoryFilter
          searchQuery={searchQuery}
          searchCategory={category}
          data={data || null}
          categoryCountOverview={categoryCountOverview}
        />
      </div>
      {category === 'news' && hasNews && (
        <div>
          <SortOrder />
        </div>
      )}

      {category === 'alle' && (
        <div
          className={classNames({ [styles.EsiWidgetWrapper]: !isHybridApp })}
          key={searchQuery}
        >
          <EsiRenderer
            esiSrc={`${__FI_BOX_SERVICE_ENDPOINT__}/services/esi-widgets/integrations/search_integration/${searchQuery}${isHybridApp ? '?is_hybrid_app=true' : ''}`}
            publication="cash"
          />
        </div>
      )}

      {
        // for some we have the issue if the search result is filtered for wikifolio or neuemissionen
        // we always show the results of the aktien table first. with the additional check if the category is not wikifolio or neuemissionen
        // we're able to fix this issue.
        hasEquity &&
          category !== 'wikifolio' &&
          category !== 'neuemissionen' && (
            <>
              {(category === 'alle' || category === 'aktien') && (
                <h2 className={styles.Title}>Aktien</h2>
              )}
              <Table
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<QuotesUnion[]> | undefined' is not assignable to type 'QuotesUnion[] | IntegrationsUnion[]'. */
                items={textSearch?.equity?.items}
                type="aktien"
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number'. */
                count={categoryCountOverview.equityCount}
                category={category}
                ctaText={`Alle Aktien (${categoryCountOverview.equityCount})`}
                ctaLink={`${findCategory('equity')?.link}${encodeURIComponent(
                  searchQuery,
                )}`}
                ctaLinkStyles={styles.ShowAllLink}
                //@TODO: set this to true as soon as the functionality for clicking the buttons in the dropdown were implemented
                hasDropdownIntegration
              />
            </>
          )
      }

      {hasIndex && (
        <>
          {(category === 'alle' || category === 'indizes') && (
            <>
              <h2 className={styles.Title}>Indizes</h2>
              <Table
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<QuotesUnion[]> | undefined' is not assignable to type 'QuotesUnion[] | IntegrationsUnion[]'. */
                items={textSearch?.index?.items}
                type="indizes"
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number'. */
                count={categoryCountOverview.indexCount}
                category={category}
                ctaText={`Alle Indizes (${categoryCountOverview.indexCount})`}
                ctaLink={`${findCategory('index')?.link}${encodeURIComponent(
                  searchQuery,
                )}`}
                ctaLinkStyles={styles.ShowAllLink}
                //@TODO: set this to true as soon as the functionality for clicking the buttons in the dropdown were implemented
                hasDropdownIntegration
              />
            </>
          )}
        </>
      )}

      {hasNews && (
        <>
          {(category === 'alle' || category === 'news') && (
            <div className={styles.NewsWrapper}>
              <h2 className={styles.Title}>News</h2>
              <div className={styles.NewsContentWrapper}>
                {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
                {/* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'Maybe<SearchableUnionEdge>'. */}
                {environment?.globalSearch?.edges.map(({ node }, index) => (
                  <div
                    key={`search_${searchQuery}_${node.id}`}
                    className={classNames(
                      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '`Item${number}`' can't be used to index type '{ readon */
                      styles[`Item${index}`],
                      styles.NewsTeaserWrapper,
                    )}
                  >
                    <Teaser
                      component={TEASER_LAYOUT_M}
                      /* @ts-ignore TODO: TS2322 ->  Type 'TeasableInterfaceNode' is not assignable to type '(TypeUnion & { id? */
                      node={node as TeasableInterfaceNode}
                      key={`stock-${node.id}`}
                      origin={SCREEN_SEARCH_RESULTS}
                    />
                  </div>
                ))}
              </div>
              {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
              {category === 'alle' && categoryCountOverview.newsCount > 3 && (
                <Link
                  className={styles.ShowAllLink}
                  path={`${findCategory('news')?.link}${encodeURIComponent(
                    searchQuery,
                  )}`}
                  label={`Alle News anzeigen`}
                />
              )}
            </div>
          )}
        </>
      )}

      {hasFund && (
        <>
          {(category === 'alle' || category === 'fonds') && (
            <>
              <h2 className={styles.Title}>Fonds</h2>
              <Table
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<QuotesUnion[]> | undefined' is not assignable to type 'QuotesUnion[] | IntegrationsUnion[]'. */
                items={textSearch?.fund?.items}
                type="fonds"
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number'. */
                count={categoryCountOverview.fundCount}
                category={category}
                ctaText={`Alle Fonds (${categoryCountOverview.fundCount})`}
                ctaLink={`${findCategory('fund')?.link}${encodeURIComponent(
                  searchQuery,
                )}`}
                ctaLinkStyles={styles.ShowAllLink}
                //@TODO: set this to true as soon as the functionality for clicking the buttons in the dropdown were implemented
                hasDropdownIntegration
              />
            </>
          )}
        </>
      )}

      {hasDerivative && (
        <>
          {(category === 'alle' || category === 'derivate') && (
            <>
              <h2 className={styles.Title}>Derivate</h2>
              <Table
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<QuotesUnion[]> | undefined' is not assignable to type 'QuotesUnion[] | IntegrationsUnion[]'. */
                items={textSearch?.derivative?.items}
                type="derivate"
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number'. */
                count={categoryCountOverview.derivateCount}
                category={category}
                ctaText={`Alle Derivate (${categoryCountOverview.derivateCount})`}
                ctaLink={`${
                  findCategory('derivative')?.link
                }${encodeURIComponent(searchQuery)}`}
                ctaLinkStyles={styles.ShowAllLink}
                //@TODO: set this to true as soon as the functionality for clicking the buttons in the dropdown were implemented
                hasDropdownIntegration
              />
            </>
          )}
        </>
      )}

      {hasDiverse && (
        <>
          {(category === 'alle' || category === 'diverse') && (
            <>
              <h2 className={styles.Title}>Diverse</h2>
              <Table
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<QuotesUnion[]> | undefined' is not assignable to type 'QuotesUnion[] | IntegrationsUnion[]'. */
                items={textSearch?.diverse?.items}
                type="diverse"
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number'. */
                count={categoryCountOverview.diverseCount}
                category={category}
                ctaText={`Alle Diverse (${categoryCountOverview.diverseCount})`}
                ctaLink={`${findCategory('diverse')?.link}${encodeURIComponent(
                  searchQuery,
                )}`}
                ctaLinkStyles={styles.ShowAllLink}
                //@TODO: set this to true as soon as the functionality for clicking the buttons in the dropdown were implemented
                hasDropdownIntegration
              />
            </>
          )}
        </>
      )}

      {hasBond && (
        <>
          {(category === 'alle' || category === 'bonds') && (
            <>
              <h2 className={styles.Title}>Bonds</h2>
              <Table
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<QuotesUnion[]> | undefined' is not assignable to type 'QuotesUnion[] | IntegrationsUnion[]'. */
                items={textSearch?.bond?.items}
                type="bonds"
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number'. */
                count={categoryCountOverview.bondCount}
                category={category}
                ctaText={`Alle Bonds (${categoryCountOverview.bondCount})`}
                ctaLink={`${findCategory('bond')?.link}${encodeURIComponent(
                  searchQuery,
                )}`}
                ctaLinkStyles={styles.ShowAllLink}
                //@TODO: set this to true as soon as the functionality for clicking the buttons in the dropdown were implemented
                hasDropdownIntegration
              />
            </>
          )}
        </>
      )}

      {hasCryptoCurrency && (
        <>
          {(category === 'alle' || category === 'kryptowaehrungen') && (
            <>
              <h2 className={styles.Title}>Kryptowährungen</h2>
              <Table
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<QuotesUnion[]> | undefined' is not assignable to type 'QuotesUnion[] | IntegrationsUnion[]'. */
                items={textSearch?.cryptoCurrency?.items}
                type="cryptoCurrency"
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number'. */
                count={categoryCountOverview.cryptoCurrencyCount}
                category={category}
                ctaText={`Alle Kryptowährungen (${categoryCountOverview.cryptoCurrencyCount})`}
                ctaLink={`${
                  findCategory('cryptoCurrency')?.link
                }${encodeURIComponent(searchQuery)}`}
                ctaLinkStyles={styles.ShowAllLink}
                //@TODO: set this to true as soon as the functionality for clicking the buttons in the dropdown were implemented
                hasDropdownIntegration
              />
            </>
          )}
        </>
      )}

      {hasNewEmission && (
        <>
          {(category === 'alle' || category === 'neuemissionen') && (
            <>
              <h2 className={styles.Title}>Neu Emissionen</h2>
              <Table
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<IntegrationsUnion[]> | undefined' is not assignable to type 'QuotesUnion[] | IntegrationsUnion[]'. */
                items={newEmission?.items}
                type="neuemissionen"
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number'. */
                count={categoryCountOverview.newEmissionCount}
                category={category}
                ctaText={`Alle Neu Emissionen (${categoryCountOverview.newEmissionCount})`}
                ctaLink={`${
                  findCategory('newEmission')?.link
                }${encodeURIComponent(searchQuery)}`}
                ctaLinkStyles={styles.ShowAllLink}
              />
            </>
          )}
        </>
      )}

      {hasWikifolio && (
        <>
          {(category === 'alle' || category === 'wikifolio') && (
            <>
              <h2 className={styles.Title}>Wikifolio</h2>
              <Table
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<IntegrationsUnion[]> | undefined' is not assignable to type 'QuotesUnion[] | IntegrationsUnion[]'. */
                items={wikifolio?.items}
                type="wikifolio"
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number'. */
                count={categoryCountOverview.wikifolioCount}
                category={category}
                ctaText={`Alle Wikifolio (${categoryCountOverview.wikifolioCount})`}
                ctaLink={`${
                  findCategory('wikifolio')?.link
                }${encodeURIComponent(searchQuery)}`}
                ctaLinkStyles={styles.ShowAllLink}
              />
            </>
          )}
        </>
      )}

      {category !== 'alle' && pagerDataCount && pagerDataCount > 20 && (
        <div key={Math.random() * 1000} className={styles.PagerWrapper}>
          <Pager
            component={PAGER_TYPE_PAGE_LOADER}
            currentPage={page}
            itemsCount={pagerDataCount}
            itemsPerPage={PAGE_SIZE}
            key={`search-result-pager-${searchQuery}`}
          />
        </div>
      )}
    </div>
  );
};

export default memo(SearchResults);
