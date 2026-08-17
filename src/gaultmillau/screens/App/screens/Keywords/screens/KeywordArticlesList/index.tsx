import React from 'react';
import { FormattedMessage } from 'react-intl';
import compose from 'recompose/compose';
import withHelmet from '../../../../../../shared/decorators/withHelmet';
import Link from '../../../../../../../common/components/Link';
import NotFound from '../../../NotFound';
import SearchResult from './components/SearchResult';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../../../components/Pager';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../../../shared/constants/structuredData';
import { URL_DE_KEYWORD, URL_FR_KEYWORD } from '../../../../constants';
import { KEYWORD_PAGE_SIZE } from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { KeywordArticlesListProps } from './typings';

type KeywordArticlesListPropsInner = KeywordArticlesListProps;

const KeywordArticlesList = ({
  keywordPage,
  page,
  language,
}: KeywordArticlesListPropsInner) => {
  if (!keywordPage || !keywordPage.entities) {
    return <NotFound />;
  }

  return (
    <>
      <div className={grid.Container}>
        <div className={styles.Header}>
          <h1 className={styles.HeaderTitle}>{keywordPage.label || ''}</h1>
          <div className={styles.DividerThick} />
          <Link
            path={
              language === 'fr' ? `/${URL_FR_KEYWORD}` : `/${URL_DE_KEYWORD}`
            }
            className={styles.OverviewLink}
          >
            <FormattedMessage
              id="app.keywordArticlesList.buttonText"
              description="text of button to get back to the list of keywords"
              defaultMessage="Alle Stichwörter"
            />
          </Link>
          <div className={styles.DividerMarginBottom} />
        </div>
      </div>
      {keywordPage.entities && (
        <div className={styles.Wrapper}>
          <SearchResult list={keywordPage.entities} />

          <Pager
            itemsCount={keywordPage.entities.count || 0}
            itemsPerPage={KEYWORD_PAGE_SIZE}
            currentPage={page}
            component={PAGER_TYPE_PAGE_LOADER}
          />
        </div>
      )}
    </>
  );
};

const KeywordArticlesListComponent = compose<any, any>(
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) => ({
      title: mapProps?.keywordPage?.label || '',
      metaDescription:
        mapProps?.keywordPage?.entities?.edges?.[0]?.node?.lead || '',
    }),
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps) => mapProps?.keywordPage?.entities?.count || 0,
    pageSize: KEYWORD_PAGE_SIZE,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodes: (mapProps) => mapProps?.keywordPage?.entities?.edges || [],
    hasBreadcrumbs: () => false,
  }),
)(KeywordArticlesList);

export default KeywordArticlesListComponent;
