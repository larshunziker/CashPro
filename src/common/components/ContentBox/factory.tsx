import React, { useEffect, useRef } from 'react';
import shuffle from 'lodash/shuffle';
import useRecommendations from '../../../shared/hooks/useRecommendations';
import Link from '../Link';
import { useSSRContext } from '../SSRContext';
import {
  CONTENT_SOURCE_MANUAL,
  CONTENT_SOURCE_MANUAL_RANDOM,
  CONTENT_SOURCE_MOST_COMMENTED,
  CONTENT_SOURCE_MOST_READ,
  CONTENT_SOURCE_MOST_SHARED,
  CONTENT_SOURCE_TICKER,
} from '../../../shared/constants/content';
import { RECOMMENDATION_OPERATION } from '../../../shared/constants/recommendations';
import { TEASER_LAYOUT_M } from '../../../shared/constants/teaser';
import { RecommendationsItem } from '../../../shared/hooks/useRecommendations/typings';
import type {
  ContentBoxData,
  ContentBoxFactoryOptions,
  ContentBoxFactoryOptionsStyles,
  ContentBoxProps,
  LatestArticlesItem,
} from './typings';

export type ContentBoxPropsInner = ContentBoxProps & {
  latestArticles?: LatestArticlesItem;
};

const defaultStyles: ContentBoxFactoryOptionsStyles = {
  Wrapper: '',
  Title: '',
  Link: '',
  TeaserWrapper: '',
};

const operations = new Map([
  [CONTENT_SOURCE_MOST_READ, RECOMMENDATION_OPERATION.MOST_READ],
  [CONTENT_SOURCE_MOST_SHARED, RECOMMENDATION_OPERATION.MOST_SHARED],
  [CONTENT_SOURCE_MOST_COMMENTED, RECOMMENDATION_OPERATION.MOST_COMMENTED],
]);

const mapRecommendations = (recommendationsEntity?: RecommendationsItem[]) =>
  recommendationsEntity?.map((item, index): RecommendationsItem => {
    return {
      node: {
        ...item.node,
        ...item,
        index: index + 1,
        __typename: 'NodeInterfaceEdge',
      },
    };
  }) || null;

const ContentBoxFactory = ({
  styles: appStyles,
  TeaserGridRenderer,
  SingleTeaser,
  getContentBoxRowGridOptions,
  contentBoxType: appContentBoxType,
  teaserLayout,
  Skeleton,
  skeletonTheme = 'GreyC',
  publication: appPublication,
  title: appTitle,
  linkLabel: appLinkLabel,
}: ContentBoxFactoryOptions) => {
  const ContentBox = (props: ContentBoxPropsInner) => {
    const { node, latestArticles } = props;
    const { recommendations, fetchRecommendations } = useRecommendations();

    const contentBoxType =
      (typeof appContentBoxType === 'function' && appContentBoxType(props)) ||
      (typeof appContentBoxType === 'string' && appContentBoxType) ||
      null;

    const linkLabel =
      (typeof appLinkLabel === 'function' && appLinkLabel(props)) ||
      (typeof appLinkLabel === 'string' && appLinkLabel) ||
      null;

    const title =
      (typeof appTitle === 'function' && appTitle(props)) ||
      (typeof appTitle === 'string' && appTitle) ||
      null;

    const isTicker = contentBoxType === CONTENT_SOURCE_TICKER;

    const fetchRecommendationsRef = useRef(fetchRecommendations);

    const styles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    const publication =
      (typeof appPublication === 'function' && appPublication(props)) ||
      (typeof appPublication === 'string' && appPublication) ||
      '';

    const { isSSR } = useSSRContext();

    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null' is not assignable to parameter of type 'string'. */
    const contentSourcesToFetch = operations.has(contentBoxType);

    // Currently only implemented for most_read, most_shared, most_commented - other content sources can be added here
    useEffect(() => {
      if (contentSourcesToFetch) {
        fetchRecommendationsRef.current({
          publication,
          excludeHistory: false,
          articleKeywords: {},
          contentId: '1', // random number as it gets igonred by mostread anyway
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null' is not assignable to parameter of type 'string'. */
          operation: operations.get(contentBoxType),
          limit: 4,
        });
      }
    }, [contentBoxType, contentSourcesToFetch, publication]);

    const contentBoxData: ContentBoxData | Record<string, any> = {};

    switch (contentBoxType) {
      case CONTENT_SOURCE_MANUAL:
      case CONTENT_SOURCE_MANUAL_RANDOM:
        contentBoxData.items = node?.items?.edges;
        contentBoxData.contentBoxType = CONTENT_SOURCE_MANUAL;
        break;
      case CONTENT_SOURCE_TICKER:
        contentBoxData.items = latestArticles || [];
        contentBoxData.contentBoxType = CONTENT_SOURCE_TICKER;
        break;
      case CONTENT_SOURCE_MOST_COMMENTED:
        contentBoxData.items = mapRecommendations(
          recommendations?.[RECOMMENDATION_OPERATION.MOST_COMMENTED]?.items,
        );
        contentBoxData.contentBoxType = CONTENT_SOURCE_MOST_COMMENTED;
        break;
      case CONTENT_SOURCE_MOST_SHARED:
        contentBoxData.items = mapRecommendations(
          recommendations?.[RECOMMENDATION_OPERATION.MOST_SHARED]?.items,
        );
        contentBoxData.contentBoxType = CONTENT_SOURCE_MOST_SHARED;
        break;
      case CONTENT_SOURCE_MOST_READ:
      default:
        contentBoxData.contentBoxType = CONTENT_SOURCE_MOST_READ;
        contentBoxData.items = mapRecommendations(
          recommendations?.[RECOMMENDATION_OPERATION.MOST_READ]?.items,
        );
    }

    //intermediate step to avoid circular dependency
    const TeaserGrid = TeaserGridRenderer();

    if (contentBoxType === CONTENT_SOURCE_MANUAL_RANDOM && SingleTeaser) {
      const randomItem =
        (!isSSR && shuffle(contentBoxData.items)[0]) || contentBoxData.items[0];
      return (
        <SingleTeaser
          component={TEASER_LAYOUT_M}
          contentBoxType={contentBoxType}
          {...randomItem.node}
        />
      );
    }

    return (
      <div className={styles.Wrapper}>
        {!node?.hideTitle && (
          <Link path={(node?.termReference as Channel)?.link || ''}>
            <span className={styles.Title}>{title}</span>
          </Link>
        )}
        {contentSourcesToFetch && !recommendations && (
          <Skeleton theme={skeletonTheme} />
        )}
        {contentBoxData.items?.length > 0 && (
          <TeaserGrid
            contentBoxData={contentBoxData}
            gridConfig={getContentBoxRowGridOptions(
              contentBoxData.items.length > 0 ? contentBoxData.items.length : 1,
              teaserLayout,
            )}
            origin={props.origin}
          />
        )}
        {isTicker && (node?.termReference as Channel)?.link && (
          <Link
            className={styles.Link}
            path={(node?.termReference as Channel)?.link || ''}
            /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
            label={linkLabel}
          />
        )}
      </div>
    );
  };

  return ContentBox;
};

export default ContentBoxFactory;
