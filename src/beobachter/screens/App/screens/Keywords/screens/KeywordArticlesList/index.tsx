import React from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';
import withHelmet from '../../../../../../shared/decorators/withHelmet';
import TestFragment from '../../../../../../../../src/shared/tests/components/TestFragment';
import AlphabeticNavigation from '../../../../components/AlphabeticNavigation';
import SubscribeButton from '../../../../components/SubscribeButton';
import StatusPage from '../../../StatusPage';
import Aside from './components/Aside';
import SearchResult from './components/SearchResult';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../../../components/Pager';
import { getAlertItemTypeByTypename } from '../../../../../../../common/components/SubscribeButton/helper';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../../../shared/constants/structuredData';
import { SITE_TITLE } from '../../../../constants';
import { KEYWORD_PAGE_SIZE } from './constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
// @ts-ignore
import fallbackImage from '../../../../assets/graphics/beobachter-fb-fallback.jpg';
import { KeywordArticlesListProps } from './typings';

type KeywordArticlesListPropsInner = KeywordArticlesListProps;

const KeywordArticlesList = ({
  keywordPage,
  page,
  location,
}: KeywordArticlesListPropsInner) => {
  if (!keywordPage || !keywordPage.entities || !keywordPage.entities.edges) {
    return (
      <TestFragment data-testid="keywordarticlelist-not-found">
        <StatusPage />
      </TestFragment>
    );
  }

  return (
    <TestFragment data-testid="keywordarticlelist-wrapper">
      <AlphabeticNavigation
        activeLetter={
          (location && location.pathname && location.pathname.split('/')[2]) ||
          'A'
        }
        lettersUrl="/stichworte/list"
        enableOverlay
      />

      <div className={styles.Header}>
        <div className={grid.Container}>
          <div className={styles.TitleWrapper}>
            <h1 className={styles.Title}>{keywordPage.label || ''}</h1>

            <div className={styles.SubscribeButtonWrapper}>
              <SubscribeButton
                theme="light"
                label={keywordPage.label || ''}
                type={getAlertItemTypeByTypename(keywordPage.__typename)}
                id={Number(keywordPage.tid)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.Wrapper}>
        <TestFragment data-testid="keywordarticlelist-searchresult-wrapper">
          <div className={grid.Container}>
            <div className={grid.Row}>
              <div
                className={classNames(grid.ColXs24, grid.ColMd15, grid.ColXl16)}
              >
                {keywordPage.entities && (
                  <SearchResult list={keywordPage.entities} />
                )}

                {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
                {keywordPage?.entities?.count > KEYWORD_PAGE_SIZE && (
                  <Pager
                    itemsCount={keywordPage.entities.count}
                    itemsPerPage={KEYWORD_PAGE_SIZE}
                    currentPage={page}
                    component={PAGER_TYPE_PAGE_LOADER}
                    addClass={styles.Pagination}
                  />
                )}
              </div>

              <div className={classNames(grid.HiddenMdDown, grid.ColMd1)}>
                <div className={styles.Divider} />
              </div>

              <div
                className={classNames(grid.ColXs24, grid.ColMd8, grid.ColXl7)}
              >
                <Aside />
              </div>
            </div>
          </div>
        </TestFragment>
      </div>
    </TestFragment>
  );
};

export default compose<any, any>(
  withHelmet({
    getNode: (mapProps: KeywordArticlesListPropsInner) => {
      return {
        ...mapProps?.keywordPage,
        title: mapProps?.keywordPage?.label || '',
        preferredUri: mapProps.location?.pathname,
      };
    },
    getFallbackTitle: (mapProps: KeywordArticlesListPropsInner) =>
      `${mapProps?.keywordPage?.label || ''} - Alles zum Thema ${
        mapProps?.keywordPage?.label || ''
      } im Überblick | ${SITE_TITLE}`,
    getFallbackDescription: (mapProps: KeywordArticlesListPropsInner) =>
      `${
        mapProps?.keywordPage?.label || ''
      } – Aktuelle Nachrichten und Hintergründe. Alle News zum Thema ${
        mapProps?.keywordPage?.label || ''
      } lesen Sie bei uns. Immer informiert bleiben.`,
    getImage: () => ({
      relativeOriginPath: fallbackImage,
    }),
    getNodesCount: (mapProps: KeywordArticlesListPropsInner): number =>
      mapProps?.keywordPage?.entities?.count || 0,
    pageSize: KEYWORD_PAGE_SIZE,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    getNodes: (mapProps: KeywordArticlesListPropsInner) =>
      mapProps?.keywordPage?.entities?.edges || [],
  }),
)(KeywordArticlesList);
