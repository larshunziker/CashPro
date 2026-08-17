/**
 * @TODO
 *
 * 1. Use location vertical instead of body class?
 */

import React, { useState } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import { FormattedMessage } from 'react-intl';
import branch from 'recompose/branch';
import compose from 'recompose/compose';
import renderComponent from 'recompose/renderComponent';
import classname from 'classnames';
import { EXTRACT_DATA_FROM_PATH } from '../../../../../shared/helpers/extractDataFromPropsByConfigMap';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import withParams from '../../../../../shared/decorators/withParams';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import NotFound from '../NotFound';
import KeywordHeader from './components/Header';
import KeywordList from './components/KeywordList';
import CharList, { LAYOUT_MAIN } from '../../components/CharList';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../components/Pager';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import { URL_DE_KEYWORD, URL_FR_KEYWORD } from '../../constants';
import { KEYWORD_PAGE_SIZE } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { KeywordsProps } from './typings';

type KeywordsPropsInner = KeywordsProps & {
  searchString: string;
};

const KeywordsArticles = ({
  data,
  page = 1,
  searchString = 'A',
}: KeywordsPropsInner) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  if (typeof data !== 'object') {
    return null;
  }

  return (
    <BodyClassName className={`keywords-detail ${styles.ArticleBody}`}>
      <>
        <KeywordHeader />
        <div className={grid.Container}>
          <div className={grid.Row}>
            {!isNavigationOpen && (
              <div
                className={classname(
                  grid.ColXs24,
                  styles.Header,
                  grid.HiddenSmUp,
                )}
              >
                <button
                  className={classname(styles.OverviewLink, {
                    [styles.OverviewLinkActive]: isNavigationOpen,
                  })}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsNavigationOpen(!isNavigationOpen);
                  }}
                >
                  <FormattedMessage
                    id="app.person.overview"
                    description="Toggle button for a-z navigation on mobile viewports"
                    defaultMessage="A-Z Liste"
                  />
                </button>
                <div className={styles.DividerMarginBottom} />
              </div>
            )}

            <div
              className={classname(grid.ColXs24, {
                [grid.HiddenSmDown]: !isNavigationOpen,
              })}
            >
              <CharList
                layout={LAYOUT_MAIN}
                link={{
                  de: `/${URL_DE_KEYWORD}/`,
                  fr: `/${URL_FR_KEYWORD}/`,
                }}
                clickHandler={() => {
                  setIsNavigationOpen(!isNavigationOpen);
                }}
              />
              <div className={styles.DividerMarginBottom} />
            </div>

            <div className={grid.ColXs24}>
              <h1 className={styles.TitleChar}>{searchString}</h1>
              {(data &&
                data?.environment?.keywordsByChar &&
                /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                data?.environment?.keywordsByChar.count > 0 && (
                  <KeywordList list={data?.environment?.keywordsByChar} />
                )) || (
                <div className={styles.NoKeywordsTextWrapper}>
                  <FormattedMessage
                    id="app.keyword.noKeywordToChar"
                    description="Text, if there is no keyword found to a char"
                    defaultMessage="Keine Stichworte zu diesem Buchstaben vorhanden"
                  />
                </div>
              )}
            </div>
            {data &&
              data?.environment?.keywordsByChar &&
              /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
              data?.environment?.keywordsByChar.count > 0 && (
                <Pager
                  itemsCount={data?.environment?.keywordsByChar.count}
                  itemsPerPage={KEYWORD_PAGE_SIZE}
                  currentPage={page}
                  component={PAGER_TYPE_PAGE_LOADER}
                />
              )}
          </div>
        </div>
      </>
    </BodyClassName>
  );
};

const withBranch = branch<any>(
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  (props) =>
    typeof props !== 'object' ||
    (props.searchString && props.searchString.length > 1) ||
    props.data?.environment?.keywordsByChar?.edges?.length === 0,
  renderComponent(NotFound),
  renderComponent(KeywordsArticles),
);

export default compose<any, any>(
  withParams,
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) => ({
      title: mapProps.searchString,
    }),
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps) =>
      mapProps?.data?.environment?.keywordsByChar?.count || 0,
    pageSize: KEYWORD_PAGE_SIZE,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodes: (mapProps) => mapProps?.data?.environment?.keywordsByChar?.edges,
    hasBreadcrumbs: () => false,
  }),
  withAppNexus({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTrackingData: (props) =>
      parseTrackingData({
        ...props,
        articleType: 'LandingPage',
        contentType: 'Keyword',
        articleId: `keywords_${props.searchString}`,
        subsection: {
          type: EXTRACT_DATA_FROM_PATH,
          value: ['props.searchString'],
        },
      }),
  }),
  withBranch,
)(KeywordsArticles);
