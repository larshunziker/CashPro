import React, { useEffect, useState } from 'react';
import useInView, {
  UseInViewResponse,
} from '../../../../../../../shared/hooks/useInView';
import useRecommendations from '../../../../../../../shared/hooks/useRecommendations';
import Recommendations from '../../../../components/Recommendations';
import { PUBLICATION_GROUP_CASH } from '../../../../../../../shared/constants/publications';
import {
  RECOMMENDATION_OPERATION,
  RECOMMENDATION_TYPE,
} from '../../../../../../../shared/constants/recommendations';
import {
  ARTICLE_RECOMMENDATION_TITLE,
  FETCH_RECOS_LIMIT,
} from '../../constants';
import { TEASER_LAYOUT_RECOMMENDATIONS } from '../../../../../../../shared/constants/teaser';
import {
  RecommendationsItem,
  useRecommendationsResponse,
} from '../../../../../../../shared/hooks/useRecommendations/typings';
import { ArticleRecommendationsProps } from './typings';

const getEmptyTeaserPlaceholder = (
  gcid: string | number = Math.random(), // Math.random as fallback if gcid is not set (should actually never happen)
  itemsCount: number = FETCH_RECOS_LIMIT,
): Array<any> => {
  return Array(itemsCount)
    .fill({})
    .map((_: any, index: number) => {
      return {
        node: { id: `${gcid}-${index}` },
        skeleton: true,
      };
    });
};

const ArticleRecommendations = ({
  gcid,
  keywords,
  isNativeAdvertising,
}: ArticleRecommendationsProps) => {
  const [recos, setRecos] = useState<Array<RecommendationsItem | any>>(
    (gcid && getEmptyTeaserPlaceholder(gcid)) || [],
  );

  const [hasFetchedRecos, setHasFetchedRecos] = useState<boolean>(false);

  const { fetchRecommendations }: useRecommendationsResponse =
    useRecommendations();

  const { setRef: RecosRef, isInView: isRecoInView }: UseInViewResponse =
    useInView({
      rootMargin: '50px',
      triggerOnce: true,
    });

  // useEffect to fetch recos
  useEffect(() => {
    if (!gcid) {
      return;
    }

    if (!hasFetchedRecos && isRecoInView) {
      fetchRecommendations({
        contentId: gcid,
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<KeywordConnection> | undefined' is not assignable to type 'KeywordConnection'. */
        articleKeywords: keywords,
        publication: PUBLICATION_GROUP_CASH,
        limit: FETCH_RECOS_LIMIT,
        operation: RECOMMENDATION_OPERATION.WITH_RELATED_CONTENT,
        type:
          (isNativeAdvertising && RECOMMENDATION_TYPE.CBRECO) ||
          RECOMMENDATION_TYPE.NATGOAL,
        nativeAdvertisingConfig: [1],
        hasRelatedContentField: false,
      }).then((res: Array<RecommendationsItem> = []) => {
        setRecos(res);
      });

      setHasFetchedRecos(true);
    }
  }, [
    hasFetchedRecos,
    fetchRecommendations,
    gcid,
    keywords,
    isNativeAdvertising,
    isRecoInView,
  ]);

  // useEffect to reset the state if the recos have already been fetched
  useEffect(() => {
    return () => {
      if (gcid) {
        setHasFetchedRecos(false);
        setRecos(getEmptyTeaserPlaceholder(gcid));
      }
    };
  }, [gcid]);
  return (
    /* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
    <div ref={RecosRef}>
      <Recommendations
        items={recos}
        title={ARTICLE_RECOMMENDATION_TITLE}
        teaserLayout={TEASER_LAYOUT_RECOMMENDATIONS}
        trackingOrigin="bottom"
      />
    </div>
  );
};

export default ArticleRecommendations;
