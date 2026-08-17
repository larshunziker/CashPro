/* istanbul ignore file */

import React, { ReactElement } from 'react';
import { useQuery } from '@apollo/client';
import ContentBoxFactory, {
  ContentBoxPropsInner,
} from '../../../../../../../common/components/ContentBox/factory';
import { TIME_ELAPSED_FORMAT_DATE_WITH_TIME } from '../../../../../../../shared/helpers/dateTimeElapsed';
import { noop } from '../../../../../../../shared/helpers/utils';
import {
  ensureTeaserInterfaceItem,
  renderDates,
} from '../../../Teaser/shared/helpers';
import Teaser from '../../../Teaser';
import Skeleton from '../../../Teaser/components/TeaserText/components/Skeleton';
import { CONTENT_SOURCE_TICKER } from '../../../../../../../shared/constants/content';
import { PUBLICATION_GROUP_CASH } from '../../../../../../../shared/constants/publications';
import { TEASER_LAYOUT_TEXT } from '../../../../../../../shared/constants/teaser';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/co */
import { GET_LATEST_TICKER_ARTICLES } from '../../queries';
import styles from './styles.legacy.css';
import { ContentBoxProps } from '../../../../../../../common/components/ContentBox/typings';

const LINK_LABEL_DEFAULT = 'Alle News';

/* @ts-ignore TODO: TS7031 ->  Binding element 'contentBoxData' implicitly has an 'any' type. */
const TeaserRenderer = ({ contentBoxData }): ReactElement => {
  if (!contentBoxData.items && !Array.isArray(contentBoxData.items)) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  return (
    <div>
      {/* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */}
      {contentBoxData.items.map((item) => (
        <div key={`content-box-item-${item.node.id}`}>
          <Teaser
            component={TEASER_LAYOUT_TEXT}
            contentBoxType={contentBoxData.contentBoxType}
            {...ensureTeaserInterfaceItem(item)}
          />
          <div className={styles.PublicationDate}>
            {renderDates(item.node, false, TIME_ELAPSED_FORMAT_DATE_WITH_TIME)}
          </div>
          <div className={styles.Divider} />
        </div>
      ))}
    </div>
  );
};

const getTitleByProps = ({ node }: ContentBoxProps) =>
  node?.title || (node.termReference as Channel).title || '';

const getLinkLabelByProps = ({ node }: ContentBoxProps) => {
  return node?.linkLabel || LINK_LABEL_DEFAULT;
};

const Ticker = ContentBoxFactory({
  styles: {
    Wrapper: styles.Wrapper,
    Title: styles.Title,
    Link: styles.Link,
    LinkWrapper: styles.LinkWrapper,
  },
  TeaserGridRenderer: () => TeaserRenderer,
  /* @ts-ignore TODO: TS2322 ->  Type '() => null' is not assignable to type '(pageSize */
  getContentBoxRowGridOptions: noop,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
  teaserLayout: null,
  Skeleton,
  publication: PUBLICATION_GROUP_CASH,
  contentBoxType: CONTENT_SOURCE_TICKER,
  linkLabel: getLinkLabelByProps,
  title: getTitleByProps,
});

const TickerWrapper = (props: ContentBoxPropsInner) => {
  const apolloConfig: ApolloConfigOptions = {
    variables: {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
      channel: parseInt((props?.node?.termReference as Channel)?.tid),
      limit: 5,
      contentTypes: ['Article'],
    },
    fetchPolicy: 'cache-and-network',
  };

  const { data: newData } = useQuery(GET_LATEST_TICKER_ARTICLES, apolloConfig);

  return (
    <Ticker
      {...props}
      latestArticles={newData?.environment?.content?.edges || []}
    />
  );
};

export default TickerWrapper;
