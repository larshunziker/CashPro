import React, { ReactElement } from 'react';

import { compose } from 'recompose';
import withHelmet from '../../../../../../shared/decorators/withHelmet';
import Link from '../../../../../../../common/components/Link';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment/index';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import SubscribeButton from '../../../../components/SubscribeButton';
import StatusPage from './../../../StatusPage';
import SearchResult from './components/SearchResult';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../../../components/Pager';
import { getAlertItemTypeByTypename } from '../../../../../../../common/components/SubscribeButton/helper';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../../../shared/constants/structuredData';
import { SITE_TITLE } from '../../../../../../screens/App/constants';
import { KEYWORD_PAGE_SIZE } from '../../../Keywords/constants';
import sections from '../../../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';

type KeywordArticlesListProps = {
  keywordPage: Keyword;
};

export type KeywordArticlesListPropsInner = Pick<
  RouterProps,
  'location' | 'page'
> &
  KeywordArticlesListProps;

const KeywordArticlesList = ({
  keywordPage,
  page,
  location,
}: KeywordArticlesListPropsInner): ReactElement => {
  if (!keywordPage || !keywordPage.entities || !keywordPage.entities.edges) {
    return (
      <TestFragment data-testid="keywordarticlelist-not-found">
        <StatusPage />
      </TestFragment>
    );
  }

  const char =
    (location && location.pathname && location.pathname.split('/')) || [];

  const breadcrumbItems: Omit<ActiveMenuTrailItemConnection, 'pageInfo'> = {
    count: 2,
    totalCount: 2,
    edges: [
      {
        node: {
          id: '',
          link: '/stichworte',
          label: 'Stichworte',
        },
      },
      {
        node: {
          id: '',
          link: '/stichworte/' + ((char && char.length >= 2 && char[2]) || ''),
          label:
            'Stichworte: ' +
            ((char && char.length > 2 && char[2].toUpperCase()) || ''),
        },
      },
    ],
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Background} />
      <div className={sections.Container}>
        <div>
          <Breadcrumbs
            title={keywordPage?.label || ''}
            /* @ts-ignore TODO: TS2322 ->  Type 'Omit<ActiveMenuTrailItemConnection, "pageInfo">' is not assignable to type 'BreadcrumbsItems'. */
            items={breadcrumbItems}
            staticData
            pageUrl={location?.pathname || ''}
          />
          <Link
            path="/stichworte"
            className={styles.OverviewLink}
            label="Alle Stichwörter"
          />

          <div className={styles.TitleWrapper}>
            <h1 className={styles.Title}>
              {keywordPage.label || ''}
              <div className={styles.SubscribeButtonWrapper}>
                <SubscribeButton
                  label={keywordPage.label || ''}
                  type={getAlertItemTypeByTypename(keywordPage.__typename)}
                  id={Number(keywordPage.tid)}
                />
              </div>
            </h1>
          </div>
        </div>
      </div>

      {keywordPage.entities && (
        <TestFragment data-testid="keywordarticlelist-searchresult-wrapper">
          <SearchResult list={keywordPage.entities} />
          <Pager
            itemsCount={keywordPage.entities.count || 0}
            itemsPerPage={KEYWORD_PAGE_SIZE}
            currentPage={page}
            component={PAGER_TYPE_PAGE_LOADER}
          />
        </TestFragment>
      )}
    </div>
  );
};

export default compose<any, any>(
  withHelmet({
    getNode: (mapProps: KeywordArticlesListPropsInner) => ({
      title: mapProps?.keywordPage?.label || '',
      preferredUri: mapProps.location?.pathname || '',
    }),
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
    getNodesCount: (mapProps: KeywordArticlesListPropsInner) =>
      mapProps?.keywordPage?.entities?.count || 0,
    pageSize: KEYWORD_PAGE_SIZE,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodes: (mapProps) => mapProps?.keywordPage?.entities?.edges || [],
  }),
)(KeywordArticlesList);
