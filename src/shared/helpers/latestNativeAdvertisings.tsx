/**
 * @file   Native Advertisings from Recos helpers
 */
import { RECOMMENDATION_OPERATION } from '../constants/recommendations';
import {
  Recommendations,
  RecommendationsNode,
} from '../../shared/hooks/useRecommendations/typings';

export function* latestNativeAdvertisingsGenerator(
  recommendations: Recommendations,
): Generator<RecommendationsNode> {
  const currentRecommendations =
    recommendations?.[RECOMMENDATION_OPERATION.LATEST_NATIVE_ADVERTISINGS];

  let i = 0;
  while (true) {
    /* @ts-ignore TODO: TS2322 ->  Type 'false | RecommendationsNode' is not assignable to type 'RecommendationsNode'. */
    yield currentRecommendations &&
      Array.isArray(currentRecommendations.items) &&
      currentRecommendations.items.length > i &&
      currentRecommendations.items[i].node;

    i++;
  }
}
