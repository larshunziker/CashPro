import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, WatchQueryFetchPolicy } from '@apollo/client';
import classNames from 'classnames';
import { TIME_ELAPSED_FORMAT_DATE_WITH_TIME } from '../../../../../../../../../shared/helpers/dateTimeElapsed';
import {
  ensureTeaserInterfaceItem,
  renderDates,
} from '../../../../../Teaser/shared/helpers';
import Link from '../../../../../../../../../common/components/Link';
import Teaser from '../../../../../Teaser';
import ContentBoxSkeleton from '../ContentBoxSkeleton';
import { TabItem } from '../../../../../../../../../common/components/ContentBoxTab/components/Tab';
import { ContentBoxBodyProps } from '../../index';
import {
  ARTICLE_CONTENT_TYPE,
  CONTENT_BOX_STYLE_NUMBERED_LIST,
  CONTENT_SOURCE_MANUAL,
} from '../../../../../../../../../shared/constants/content';
import { GLOBAL_SEARCH_SORT_BY_PUBLICATION_DATE } from '../../../../../../../../../shared/constants/globalSearch';
import { TEASER_LAYOUT_TEXT } from '../../../../../../../../../shared/constants/teaser';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { LATEST_NEWS_BY_VALOR_QUERY } from './queries';
import styles from './styles.legacy.css';

type BodyProps = {
  items: SearchableUnionGraphListItem[];
  currentTab: TabItem;
};

type ContentBoxTabQuery = ApolloData & {
  environment: {
    content: SearchableUnionGraphList;
    globalSearch: SearchableUnionGraphList;
  };
};

const Body = ({ items, currentTab }: BodyProps) => {
  if (!items || items.length === 0) {
    return (
      <div className={styles.ContentBoxBodyWrapper}>Keine Nachrichten</div>
    );
  }

  const isNumberedList = currentTab.style === CONTENT_BOX_STYLE_NUMBERED_LIST;

  return (
    <div>
      {items?.map((item, index) => (
        <div
          /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
          key={`content-box-item-${item.node.id}-${index}`}
          className={classNames({
            [styles.Divider]: index > 0,
          })}
        >
          <div className={styles.ContentBoxBodyWrapper}>
            {isNumberedList && (
              <div className={styles.NumberedList}>{index + 1}</div>
            )}
            <div>
              <Teaser
                component={TEASER_LAYOUT_TEXT}
                contentBoxType={currentTab.sortBy}
                {...ensureTeaserInterfaceItem(item)}
              />
              <div
                className={classNames(styles.PublicationDate, {
                  [styles.PublicationDateWithNumberedList]: isNumberedList,
                })}
              >
                {renderDates(
                  item.node as TeasableInterfaceNode,
                  false,
                  TIME_ELAPSED_FORMAT_DATE_WITH_TIME,
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      {currentTab?.termReference && currentTab?.linkLabel && (
        <div className={styles.LinkWrapper}>
          <Link
            className={styles.Link}
            path={currentTab?.termReference?.link || ''}
            label={currentTab.linkLabel}
          />
        </div>
      )}
    </div>
  );
};

const LatestNewsByValors = ({ currentTab }: ContentBoxBodyProps) => {
  const params = useParams();
  const valorNameList =
    (params?.valorName && params.valorName.split('-')) || [];
  const valorNr =
    (valorNameList.length > 0 && valorNameList[valorNameList.length - 1]) || '';

  const apolloConfig = {
    query: LATEST_NEWS_BY_VALOR_QUERY,
    variables: {
      contentTypes: [ARTICLE_CONTENT_TYPE],
      limit: 5,
      publication: 'CASH',
      query: `*`,
      sort: GLOBAL_SEARCH_SORT_BY_PUBLICATION_DATE,
      valors: [`${valorNr}`],
    },
    fetchPolicy: 'cache-first' as WatchQueryFetchPolicy,
  };

  const { data, loading, error } = useQuery<ContentBoxTabQuery>(
    apolloConfig.query,
    {
      variables: apolloConfig.variables,
      fetchPolicy: apolloConfig.fetchPolicy,
      skip: !valorNr,
    },
  );

  if (!valorNr) {
    return null;
  }

  let items: SearchableUnionGraphListItem[] = [];

  // if the mode of the tab is set to manual it means that the editor
  // has set the items manually in the cms. We have already
  // fetched these data in the initial routeByPath call and
  // don't need to fire another gql query in this case.
  if (
    currentTab?.mode === CONTENT_SOURCE_MANUAL &&
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    currentTab?.items?.edges?.length > 0
  ) {
    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<Maybe<NodeInterfaceEdge>[]> | undefined' is not assignable to type 'SearchableUnionGraphListItem[]'. */
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    items = currentTab.items.edges;
    return <Body items={items} currentTab={currentTab} />;
  }

  if (error || (!loading && !data)) {
    return null;
  }

  if (loading && !error) {
    return <ContentBoxSkeleton />;
  }

  if (data) {
    items = data?.environment?.globalSearch?.edges || [];
  }

  return <Body items={items} currentTab={currentTab} />;
};

export default LatestNewsByValors;
