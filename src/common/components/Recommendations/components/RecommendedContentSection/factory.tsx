import React, { ReactElement } from 'react';
import useInView, {
  UseInViewResponse,
} from '../../../../../shared/hooks/useInView';
import useRecommendations from '../../../../../shared/hooks/useRecommendations';
import {
  Recommendations,
  useRecommendationsResponse,
} from '../../../../../shared/hooks/useRecommendations/typings';
import {
  RecommendedContentSectionFactoryOptions,
  RecommendedContentSectionProps,
} from './typings';

const IDENTIFIER = 'recommended-content';

export type RecommendedContentSectionPropsInner =
  RecommendedContentSectionProps & {
    relatedContentItems?: Recommendations;
    shouldFetchRecommendations?: boolean;
    pageLayoutType?: string;
  };

const RecommendedContentSectionFactory = ({
  RelatedContent,
  publication,
  gridLayout: appGridLayout,
  hasTitleContainer = true,
}: RecommendedContentSectionFactoryOptions) => {
  const RecommendedContentSection = (
    props: RecommendedContentSectionPropsInner,
  ): ReactElement => {
    const { setRef, isInView }: UseInViewResponse = useInView({
      rootMargin: '200px',
      triggerOnce: true,
    });
    const {
      article,
      title,
      outerWrapperClass,
      limit = 6,
      nativeAdvertisingConfig = [],
      type,
      operation,
      hasRelatedContentField,
      skipInArticleRecommendations = 3,
      shouldFetchRecommendations = true,
      relatedContentItems = null,
      isSplittedPageLayout = false,
    } = props;

    const {
      recommendations,
      fetchRecommendations,
    }: useRecommendationsResponse = useRecommendations();

    if (!article) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return null;
    }

    const articleRecommendations = shouldFetchRecommendations
      ? recommendations
      : relatedContentItems;

    if (isInView && article.gcid && shouldFetchRecommendations) {
      fetchRecommendations({
        contentId: article.gcid,
        /* @ts-ignore TODO: TS2322 ->  Type 'KeywordConnection | null' is not assignable to type 'KeywordConnection'. */
        articleKeywords: article.keywords || null,
        publication: publication,
        excludeHistory: false,
        limit,
        nativeAdvertisingConfig,
        type,
        operation,
        hasRelatedContentField,
      });
    }

    if (
      articleRecommendations &&
      /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
      articleRecommendations?.[operation]?.items?.length
    ) {
      /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
      const mappedItems = articleRecommendations?.[operation]?.items.slice(
        skipInArticleRecommendations,
      );

      // gcids for impression tracking
      const contentGcids = mappedItems
        /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
        .filter((item) => item.node.gcid)
        /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
        .map((item) => item.node.gcid);

      const gridLayout =
        (typeof appGridLayout === 'function' && appGridLayout(props)) ||
        (typeof appGridLayout === 'string' && appGridLayout) ||
        null;

      return (
        <div
          /* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
          ref={setRef}
          className={IDENTIFIER}
          /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
          data-type={articleRecommendations?.[operation]?.metaData?.type || ''}
          data-correlationid={
            /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
            articleRecommendations?.[operation]?.metaData?.correlationId || ''
          }
          data-articleids={contentGcids}
          data-testid="recommendedcontentsection-wrapper"
        >
          <RelatedContent
            teaserGridLayout={gridLayout}
            gridOptionType={'title'}
            title={title}
            titleHasContainer={hasTitleContainer}
            titleInverted={true}
            relatedContent={{ edges: mappedItems }}
            outerWrapperClass={outerWrapperClass}
            isSplittedPageLayout={isSplittedPageLayout}
          />
        </div>
      );
    }

    /* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
    return <div ref={setRef} className={IDENTIFIER} />;
  };

  return RecommendedContentSection;
};

export default RecommendedContentSectionFactory;
