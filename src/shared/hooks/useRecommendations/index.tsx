import { useState } from 'react';
import storageAvailable from '../../helpers/storage';
import {
  RECOMMENDATION_OPERATION,
  RECOMMENDATION_TYPE,
} from '../../constants/recommendations';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/shared/hooks/useRecomme */
import { getQueries } from './queries';
import type {
  Recommendations,
  RecommendationsItem,
  useRecommendationsConfig,
  useRecommendationsResponse,
} from './typings';

const getArticleKeywords = (articleKeywords: KeywordConnection) => {
  const keywords: string[] = [];

  if (articleKeywords?.edges && Array.isArray(articleKeywords.edges)) {
    articleKeywords.edges.forEach((item: KeywordEdge): void => {
      if (item && item.node && item.node.label) {
        keywords.push(item.node.label);
      }
    });
  }

  return keywords.sort();
};

const getVariablesByOperationType = ({
  contentId,
  articleKeywords,
  mainChannel,
  operation = RECOMMENDATION_OPERATION.DEFAULT,
  limit = 3,
  nativeAdvertisingConfig,
  // hasRelatedContentField is used for RECOMMENDATION_OPERATION.WITH_RELATED_CONTENT only
  // (if needed in another operation, add it in the GQL Schema ./queries.tsx file)
  hasRelatedContentField,
  ignoreTeaserImpressions,
  fallbackNativeAdvertisingGcIds,
}: useRecommendationsConfig) => {
  switch (operation) {
    case RECOMMENDATION_OPERATION.MOST_READ:
    case RECOMMENDATION_OPERATION.MOST_COMMENTED:
    case RECOMMENDATION_OPERATION.MOST_SHARED:
      return {
        limit,
      };

    case RECOMMENDATION_OPERATION.LATEST_NATIVE_ADVERTISINGS:
      return {
        contentId: contentId.toString(),
        limit,
      };

    default:
      return {
        contentId: contentId.toString(),
        domainUserId: '',
        articleKeywords: getArticleKeywords(articleKeywords),
        mainChannel: mainChannel,
        limit,
        nativeAdvertisingConfig,
        hasRelatedContentField,
        ignoreTeaserImpressions,
        fallbackNativeAdvertisingGcIds,
      };
  }
};

const useRecommendations = (): useRecommendationsResponse => {
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'Recommendations | (() => Recommendations)'. */
  const [recommendations, setRecommendations] = useState<Recommendations>(null);

  const fetchRecommendations = async (
    options: useRecommendationsConfig,
    dynamicOperationsConfig: RECOMMENDATION_OPERATION[] = [],
  ) => {
    const {
      contentId,
      publication,
      operation = RECOMMENDATION_OPERATION.DEFAULT,
      excludeHistory = false,
      type = RECOMMENDATION_TYPE.CBRECO,
    } = options;

    if (!contentId || !publication) {
      return;
    }

    if (
      dynamicOperationsConfig.length &&
      dynamicOperationsConfig.some(
        (dynamicOperation) =>
          recommendations?.[dynamicOperation]?.metaData?.contentId ===
          contentId,
      )
    ) {
      return;
    }

    if (recommendations?.[operation]?.metaData?.contentId === contentId) {
      return;
    }

    const items: RecommendationsItem[] = [];
    const variables = {
      type,
      publication,
      ...getVariablesByOperationType(options), // enrich variables depending on operation type
    };

    let tealiumLastViewedIds: string[] = [];
    if (excludeHistory) {
      const hasLocalStorage = storageAvailable('localStorage');
      if (hasLocalStorage) {
        const tealiumLastViewed = JSON.parse(
          localStorage.getItem('tealium_last_viewed') || '{}',
        );
        tealiumLastViewedIds = Array.from(tealiumLastViewed);
      }
    }

    const queryMap = getQueries(dynamicOperationsConfig);
    const query =
      operation === RECOMMENDATION_OPERATION.DYNAMIC
        ? queryMap[RECOMMENDATION_OPERATION.DYNAMIC]
        : queryMap[operation];

    const finalUrl = `${__RECOS_ENDPOINT__}?query=${encodeURIComponent(
      query,
    )}&variables=${encodeURIComponent(JSON.stringify(variables))}`;

    /* @ts-ignore TODO: TS7006 ->  Parameter 'json' implicitly has an 'any' type. */
    const fetchRecommendationData = (json) => {
      const recommendationsData = json?.data?.[operation];

      switch (operation) {
        case RECOMMENDATION_OPERATION.DYNAMIC:
          const dynamicRecommendations = {};

          dynamicOperationsConfig.forEach((operationConf) => {
            const dynamicRecommendationsItem: RecommendationsItem[] = [];
            const currentOperationData = json?.data?.[operationConf];

            if (currentOperationData) {
              /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
              currentOperationData.items.forEach((item) => {
                if (contentId !== item.gcid) {
                  dynamicRecommendationsItem.push({ node: item });
                }

                /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'RECOMMENDATION_OPERATION' can't be used to index type  */
                dynamicRecommendations[operationConf] = {
                  ...currentOperationData,
                  items: dynamicRecommendationsItem,
                };
              });
            }
          });

          setRecommendations(dynamicRecommendations);

          break;

        case RECOMMENDATION_OPERATION.MOST_READ:
        case RECOMMENDATION_OPERATION.MOST_SHARED:
        case RECOMMENDATION_OPERATION.MOST_COMMENTED:
          if (recommendationsData) {
            setRecommendations({
              [operation]: {
                ...recommendationsData,
              },
            });
          }
          break;

        case RECOMMENDATION_OPERATION.LATEST_NATIVE_ADVERTISINGS:
          if (recommendationsData) {
            /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
            recommendationsData.items.forEach((item) => {
              if (contentId !== item.gcid) {
                items.push({
                  node: item,
                });
              }
            });

            setRecommendations({
              [operation]: {
                ...recommendationsData,
                items,
              },
            });

            break;
          }

        default:
          if (recommendationsData) {
            /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
            recommendationsData.items.forEach((item) => {
              if (contentId !== item.gcid) {
                if (
                  !excludeHistory ||
                  (excludeHistory && !tealiumLastViewedIds.includes(item.gcid))
                ) {
                  items.push({
                    node: item,
                  });
                }
              }
            });

            setRecommendations({
              [operation]: {
                metaData: {
                  contentId,
                  type: recommendationsData.metaData?.type || type,
                  correlationId:
                    recommendationsData.metaData?.correlationId || '',
                },
                items,
              },
            });
          }
      }
    };

    try {
      const response = await fetch(finalUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      const data = await response.json();
      fetchRecommendationData(data);
    } catch (e) {
      console.error('Could not fetch recommendations!', e); // eslint-disable-line no-console
    }

    return items;
  };

  return {
    recommendations,
    /* @ts-ignore TODO: TS2322 ->  Type '(options */
    fetchRecommendations,
  };
};

export default useRecommendations;
