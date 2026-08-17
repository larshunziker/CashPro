/* istanbul ignore file */

import React from 'react';
import { useQuery } from '@apollo/client';
import ContentBoxFactory, {
  ContentBoxPropsInner,
} from '../../../../../../../common/components/ContentBox/factory';
import { noop } from '../../../../../../../shared/helpers/utils';
import { ensureTeaserInterfaceItem } from '../../../Teaser/shared/helpers';
import Error from '../../../../../../../cash/screens/App/components/Error';
import Teaser from '../../../Teaser';
import Skeleton from '../../../Teaser/components/TeaserText/components/Skeleton';
import { CONTENT_SOURCE_TICKER } from '../../../../../../../shared/constants/content';
import { PUBLICATION_GROUP_HZ } from '../../../../../../../shared/constants/publications';
import { TEASER_LAYOUT_TEXT } from '../../../../../../../shared/constants/teaser';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../queries'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/scre */
import { GET_LATEST_TICKER_ARTICLES } from '../../queries';
import styles from './styles.legacy.css';
import { ContentBoxProps } from '../../../../../../../common/components/ContentBox/typings';

const LINK_LABEL_DEFAULT = 'Alle News';

/* @ts-ignore TODO: TS7031 ->  Binding element 'items' implicitly has an 'any' type. */
const TeaserRenderer = ({ contentBoxData: { items } }) => {
  if (!items && !Array.isArray(items)) {
    return null;
  }

  return (
    <div className={styles.TeaserWrapper}>
      {/* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */}
      {items.map((item) => (
        <div key={`content-box-item-${item.node.id}`}>
          <Teaser
            component={TEASER_LAYOUT_TEXT}
            contentBoxType={CONTENT_SOURCE_TICKER}
            {...ensureTeaserInterfaceItem(item)}
          />
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
    TeaserWrapper: styles.TeaserWrapper,
  },
  /* @ts-ignore TODO: TS2322 ->  Type '({ contentBoxData */
  TeaserGridRenderer: () => TeaserRenderer,
  /* @ts-ignore TODO: TS2322 ->  Type '() => null' is not assignable to type '(pageSize */
  getContentBoxRowGridOptions: noop,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
  teaserLayout: null,
  Skeleton,
  publication: PUBLICATION_GROUP_HZ,
  contentBoxType: CONTENT_SOURCE_TICKER,
  linkLabel: getLinkLabelByProps,
  title: getTitleByProps,
});

const TickerWrapper = (props: ContentBoxPropsInner) => {
  const apolloConfig: ApolloConfigOptions = {
    variables: {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
      channel: parseInt((props?.node?.termReference as Channel)?.tid),
      limit: 6,
      contentTypes: ['Article'],
    },
    fetchPolicy: 'cache-and-network',
  };

  const { data, error } = useQuery(GET_LATEST_TICKER_ARTICLES, apolloConfig);

  if (error) {
    return __DEVELOPMENT__ ? (
      <Error msg={`Something went wrong: ${error}`} />
    ) : null;
  }

  if (!data || !data?.environment?.content?.edges) {
    return null;
  }

  return (
    <Ticker
      {...props}
      latestArticles={data?.environment?.content?.edges || []}
    />
  );
};

export default TickerWrapper;
