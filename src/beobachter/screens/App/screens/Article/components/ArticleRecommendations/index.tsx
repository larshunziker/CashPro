import React, { useEffect, useState } from 'react';
import {
  authorPrefixConfig,
  DEFAULT_AUTHOR_PREFIX_LANGUAGE,
} from '../../../../../../../shared/helpers/authors';
import storageAvailable from '../../../../../../../shared/helpers/storage';
import { log } from '../../../../../../../shared/helpers/utils';
import useInView, {
  UseInViewResponse,
} from '../../../../../../../shared/hooks/useInView';
import useRecommendations from '../../../../../../../shared/hooks/useRecommendations';
import RecommendedContentSection from '../RecommendedContentSection';
import { TRACKING_CLASS_ARTICLE_RECOMMENDATIONS } from '../../../../../../../shared/constants/tracking';
import { RECOMMENDATION_OPERATION } from '../../../../../../../shared/constants/recommendations';
import { PUBLICATION_BEO } from '../../../../../../../shared/constants/publications';
import { RIGHT_COLUMN_PAGE_LAYOUT_TYPE } from '../../../../../../../common/screens/PageTemplate/constants';
import recosStyles from '../RelatedArticlesSection/styles.legacy.css';
import { ArticlePageProps } from '../../../ArticlePage/typings';
import { useRecommendationsResponse } from '../../../../../../../shared/hooks/useRecommendations/typings';
import { RecommendationsToDisplay } from './typings';

const DEFAULT_RECOMMENDATIONS_LIMIT = 3;
const RECOMMENDATIONS_AB_TESTING_CONFIG_KEY =
  'recommendationsUnderArticleABTestingConfig';

type ArticleRecommendationsProps = Pick<ArticlePageProps, 'article'> & {
  pageLayoutType: string;
};

const recommendationsToDisplay: RecommendationsToDisplay[] = [
  {
    getTitle: (article) => `Mehr zum Thema ${article.channel?.title}`,
    operation: RECOMMENDATION_OPERATION.IN_CHANNEL,
  },
  {
    getTitle: (article) => {
      const lastAuthorSeparator =
        authorPrefixConfig['last_separator'][DEFAULT_AUTHOR_PREFIX_LANGUAGE];

      const authorNames = (article.authors?.edges || []).reduce(
        (accumulator, currentValue, index, arr) => {
          if (arr.length === 1) {
            /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
            /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
            return currentValue.node.name;
          }

          if (index === arr.length - 1) {
            /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
            /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
            return `${accumulator}${lastAuthorSeparator}${currentValue.node.name}`;
          }

          return accumulator
            ? /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
              /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
              accumulator + `, ${currentValue.node.name}`
            : /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
              /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
              currentValue.node.name;
        },
        '',
      );

      return `Mehr von ${authorNames}`;
    },
    operation: RECOMMENDATION_OPERATION.WITH_SAME_AUTHOR,
  },
  {
    getTitle: () => 'Weitere Empfehlungen',
    operation: RECOMMENDATION_OPERATION.WITH_RELATED_CONTENT,
  },
];

const ArticleRecommendations = ({
  article,
  pageLayoutType,
}: ArticleRecommendationsProps) => {
  const [recommendationsABTestingConfig, setRecommendationsABTestingConfig] =
    useState(null);

  const { recommendations, fetchRecommendations }: useRecommendationsResponse =
    useRecommendations();

  const { gcid, keywords }: Article | NativeAdvertising = article;

  const { setRef, isInView }: UseInViewResponse = useInView({
    rootMargin: '400px',
    triggerOnce: true,
  });

  const isSessionStorageAvailable = storageAvailable('sessionStorage');

  useEffect(() => {
    if (isSessionStorageAvailable) {
      try {
        const recommendationConfigData = sessionStorage.getItem(
          RECOMMENDATIONS_AB_TESTING_CONFIG_KEY,
        );
        const parsedRecommendationConfigData = JSON.parse(
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null' is not assignable to parameter of type 'string'. */
          recommendationConfigData,
        );
        const isABTestingConfigIsArray = Array.isArray(
          parsedRecommendationConfigData,
        );

        if (!isABTestingConfigIsArray) {
          log(
            'SessionStorage',
            [
              `Key "${RECOMMENDATIONS_AB_TESTING_CONFIG_KEY}" has wrong config value. You need to pass correct value. Example: [{type: "recommendationsInChannel"}]`,
            ],
            'yellow',
          );

          return;
        }

        /* @ts-ignore TODO: TS2345 ->  Argument of type 'any[]' is not assignable to parameter of type 'SetStateAction<null>'. */
        setRecommendationsABTestingConfig(parsedRecommendationConfigData);
      } catch (e) {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isInView) {
    const commonRecommendationsConfig = {
      contentId: gcid,
      articleKeywords: keywords || null,
      publication: PUBLICATION_BEO,
      excludeHistory: false,
      limit: 4,
      hasRelatedContentField: false,
      operation: RECOMMENDATION_OPERATION.DYNAMIC,
    };

    const shouldFetchWithSameAuthorRecommendations = !!(
      article.authors?.edges || []
    ).length;

    const shouldFetchInChannelRecommendations = !!article.channel;

    const dynamicOperationsConfig = recommendationsToDisplay.reduce(
      (acc, recommendation) => {
        switch (recommendation.operation) {
          case RECOMMENDATION_OPERATION.WITH_SAME_AUTHOR:
            if (shouldFetchWithSameAuthorRecommendations) {
              /* @ts-ignore TODO: TS2345 ->  Argument of type 'import("/Users/bhs/code/work/rasch-stack/src/shared/constants/recommendations").RECOMMENDATION_OPERAT */
              acc.push(recommendation.operation);
            }
            break;
          case RECOMMENDATION_OPERATION.IN_CHANNEL:
            if (shouldFetchInChannelRecommendations) {
              /* @ts-ignore TODO: TS2345 ->  Argument of type 'import("/Users/bhs/code/work/rasch-stack/src/shared/constants/recommendations").RECOMMENDATION_OPERAT */
              acc.push(recommendation.operation);
            }
            break;
          default:
            /* @ts-ignore TODO: TS2345 ->  Argument of type 'import("/Users/bhs/code/work/rasch-stack/src/shared/constants/recommendations").RECOMMENDATION_OPERAT */
            acc.push(recommendation.operation);
        }

        return acc;
      },
      [],
    );

    /* @ts-ignore TODO: TS2345 ->  Argument of type '{ contentId */
    fetchRecommendations(commonRecommendationsConfig, dynamicOperationsConfig);
  }

  // This is for A/B Testing purposes, we sort recommendations with order passed in config
  /* @ts-ignore TODO: TS2339 ->  Property 'length' does not exist on type 'never'. */
  const recommendationsUnderArticle = recommendationsABTestingConfig?.length
    ? recommendationsToDisplay.sort((recommendationA, recommendationB) => {
        /* @ts-ignore TODO: TS2339 ->  Property 'findIndex' does not exist on type 'never'. */
        const indexA = recommendationsABTestingConfig.findIndex(
          /* @ts-ignore TODO: TS7006 ->  Parameter 'rec' implicitly has an 'any' type. */
          (rec) => rec.type === recommendationA.operation,
        );

        /* @ts-ignore TODO: TS2339 ->  Property 'findIndex' does not exist on type 'never'. */
        const indexB = recommendationsABTestingConfig.findIndex(
          /* @ts-ignore TODO: TS7006 ->  Parameter 'rec' implicitly has an 'any' type. */
          (rec) => rec.type === recommendationB.operation,
        );

        return indexA - indexB;
      })
    : recommendationsToDisplay;

  let recommendationsToShow = [];
  if (pageLayoutType === RIGHT_COLUMN_PAGE_LAYOUT_TYPE) {
    recommendationsToShow = recommendationsUnderArticle.slice(0, 1);
  } else {
    recommendationsToShow = recommendationsUnderArticle.slice(1);
  }

  return (
    /* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
    <div ref={setRef}>
      {recommendationsToShow.map((recommendation) => {
        if (
          recommendationsABTestingConfig &&
          /* @ts-ignore TODO: TS2339 ->  Property 'some' does not exist on type 'never'. */
          !recommendationsABTestingConfig.some(
            /* @ts-ignore TODO: TS7006 ->  Parameter 'e' implicitly has an 'any' type. */
            (e) => e.type === recommendation.operation,
          )
        ) {
          return null;
        }

        return (
          <div
            className={`${TRACKING_CLASS_ARTICLE_RECOMMENDATIONS}-${recommendation.operation}`}
            key={recommendation.operation}
          >
            <div className={recosStyles.OuterWrapper}>
              <RecommendedContentSection
                article={{
                  canonicalUri: article.canonicalUri,
                  keywords: article.keywords,
                  preferredUri: article.preferredUri,
                  relatedArticles: article.relatedArticles,
                  gcid: article.gcid,
                }}
                title={recommendation.getTitle(article)}
                type={recommendation?.type}
                limit={recommendation?.limit ?? DEFAULT_RECOMMENDATIONS_LIMIT}
                operation={recommendation.operation}
                hasRelatedContentField={false}
                skipInArticleRecommendations={0}
                shouldFetchRecommendations={false}
                relatedContentItems={recommendations}
                pageLayoutType={pageLayoutType}
                isSplittedPageLayout={
                  pageLayoutType === RIGHT_COLUMN_PAGE_LAYOUT_TYPE
                }
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleRecommendations;
