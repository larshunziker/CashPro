import { RECOMMENDATION_OPERATION } from '../../constants/recommendations';
import { teaserListFragment } from './fragments';

const recommendations = `
  recommendations(
      type: $type
      keywords: $keywords
      articleKeywords: $articleKeywords
      publication: $publication
      contentId: $contentId
      domainUserId: $domainUserId
      mainChannel: $mainChannel
      limit: $limit
      nativeAdvertisingConfig: $nativeAdvertisingConfig
      ignoreTeaserImpressions: $ignoreTeaserImpressions
      fallbackNativeAdvertisingGcIds: $fallbackNativeAdvertisingGcIds
    ) {
      ...teaserList
    }
`;

const mostRead = `
  mostRead(publication: $publication, limit: $limit) {
    ...teaserList
  }
`;

const mostCommented = `
  mostCommented(publication: $publication, limit: $limit) {
    ...teaserList
  }
`;

const mostShared = `
  mostShared(publication: $publication, limit: $limit) {
    ...teaserList
  }
`;

const latestNativeAdvertisings = `
  latestNativeAdvertisings(publication: $publication, limit: $limit, contentId: $contentId) {
      ...teaserList
    }
`;

const recommendationsWithRelatedContent = `
  recommendationsWithRelatedContent(
      type: $type
      keywords: $keywords
      articleKeywords: $articleKeywords
      publication: $publication
      contentId: $contentId
      domainUserId: $domainUserId
      mainChannel: $mainChannel
      limit: $limit
      nativeAdvertisingConfig: $nativeAdvertisingConfig
      hasRelatedContentField: $hasRelatedContentField
    ) {
      ...teaserList
    }
`;

const recommendationsInChannel = `
  recommendationsInChannel(
      type: $type
      keywords: $keywords
      articleKeywords: $articleKeywords
      publication: $publication
      contentId: $contentId
      domainUserId: $domainUserId
      mainChannel: $mainChannel
      limit: $limit
      nativeAdvertisingConfig: $nativeAdvertisingConfig
    ) {
      ...teaserList
    }
`;

const moreFromSameAuthor = `
  moreFromSameAuthor(
      type: $type
      keywords: $keywords
      articleKeywords: $articleKeywords
      publication: $publication
      contentId: $contentId
      domainUserId: $domainUserId
      mainChannel: $mainChannel
      limit: $limit
      nativeAdvertisingConfig: $nativeAdvertisingConfig
    ) {
      ...teaserList
    }
`;

const operationsMap = new Map([
  [RECOMMENDATION_OPERATION.DEFAULT, recommendations],
  [RECOMMENDATION_OPERATION.MOST_READ, mostRead],
  [RECOMMENDATION_OPERATION.MOST_COMMENTED, mostCommented],
  [RECOMMENDATION_OPERATION.MOST_SHARED, mostShared],
  [
    RECOMMENDATION_OPERATION.LATEST_NATIVE_ADVERTISINGS,
    latestNativeAdvertisings,
  ],
  [
    RECOMMENDATION_OPERATION.WITH_RELATED_CONTENT,
    recommendationsWithRelatedContent,
  ],
  [RECOMMENDATION_OPERATION.IN_CHANNEL, recommendationsInChannel],
  [RECOMMENDATION_OPERATION.WITH_SAME_AUTHOR, moreFromSameAuthor],
]);

const getBaseRecommendationsQuery = (operations = []) => `
  query BaseRecommendationsQuery(
    $type: String
    $keywords: [String]
    $articleKeywords: [String]
    $publication: PublicationEnum!
    $contentId: String
    $domainUserId: String
    $mainChannel: String
    $limit: Int
    $nativeAdvertisingConfig: [Int]
    $hasRelatedContentField: Boolean
  ) {
    ${operations.map((operation) => operationsMap.get(operation)).join('')}
  }
  ${teaserListFragment}
`;

export const recommendationsQuery = `
  query Recommendations(
    $type: String
    $keywords: [String]
    $articleKeywords: [String]
    $publication: PublicationEnum!
    $contentId: String
    $domainUserId: String
    $mainChannel: String
    $limit: Int
    $nativeAdvertisingConfig: [Int]
    $ignoreTeaserImpressions: Boolean
    $fallbackNativeAdvertisingGcIds: [String!]
  ) {
    ${recommendations}
  }
  ${teaserListFragment}
`;

export const mostReadQuery = `
  query MostRead($publication: PublicationEnum!, $limit: Int) {
    ${mostRead}
  }
  ${teaserListFragment}
`;

export const mostCommentedQuery = `
  query MostCommented($publication: PublicationEnum!, $limit: Int) {
    ${mostCommented}
  }
  ${teaserListFragment}
`;

export const mostSharedQuery = `
  query MostShared($publication: PublicationEnum!, $limit: Int) {
    ${mostShared}
  }
  ${teaserListFragment}
`;

export const latestNativeArticlesQuery = `
  query LatestNativeAdvertisings($publication: PublicationEnum!, $limit: Int, $contentId: String) {
    ${latestNativeAdvertisings}
  }
  ${teaserListFragment}
`;

export const recommendationsWithRelatedContentQuery = `
  query RecommendationsWithRelatedContent(
    $type: String
    $keywords: [String]
    $articleKeywords: [String]
    $publication: PublicationEnum!
    $contentId: String
    $domainUserId: String
    $mainChannel: String
    $limit: Int
    $nativeAdvertisingConfig: [Int]
    $hasRelatedContentField: Boolean
  ) {
    ${recommendationsWithRelatedContent}
  }
  ${teaserListFragment}
`;

export const recommendationsInChannelQuery = `
  query RecommendationsInChannel(
    $type: String
    $keywords: [String]
    $articleKeywords: [String]
    $publication: PublicationEnum!
    $contentId: String
    $domainUserId: String
    $mainChannel: String
    $limit: Int
    $nativeAdvertisingConfig: [Int]
  ) {
    ${recommendationsInChannel}
  }
  ${teaserListFragment}
`;

export const recommendationsWithSameAuthorQuery = `
  query RecommendationsWithSameAuthorQuery(
    $type: String
    $keywords: [String]
    $articleKeywords: [String]
    $publication: PublicationEnum!
    $contentId: String
    $domainUserId: String
    $mainChannel: String
    $limit: Int
    $nativeAdvertisingConfig: [Int]
  ) {
    ${moreFromSameAuthor}
  }
  ${teaserListFragment}
`;

export const getQueries = (operationConfig = []) => {
  return {
    [RECOMMENDATION_OPERATION.DEFAULT]: recommendationsQuery,
    [RECOMMENDATION_OPERATION.MOST_READ]: mostReadQuery,
    [RECOMMENDATION_OPERATION.MOST_COMMENTED]: mostCommentedQuery,
    [RECOMMENDATION_OPERATION.MOST_SHARED]: mostSharedQuery,
    [RECOMMENDATION_OPERATION.WITH_RELATED_CONTENT]:
      recommendationsWithRelatedContentQuery,
    [RECOMMENDATION_OPERATION.IN_CHANNEL]: recommendationsInChannelQuery,
    [RECOMMENDATION_OPERATION.LATEST_NATIVE_ADVERTISINGS]:
      latestNativeArticlesQuery,
    [RECOMMENDATION_OPERATION.WITH_SAME_AUTHOR]:
      recommendationsWithSameAuthorQuery,
    [RECOMMENDATION_OPERATION.DYNAMIC]:
      getBaseRecommendationsQuery(operationConfig),
  };
};
