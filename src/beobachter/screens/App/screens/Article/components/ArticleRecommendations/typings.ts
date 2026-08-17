import {
  RECOMMENDATION_OPERATION,
  RECOMMENDATION_TYPE,
} from '../../../../../../../shared/constants/recommendations';

export type RecommendationsToDisplay = {
  getTitle: (article: Article | NativeAdvertising) => string;
  operation: RECOMMENDATION_OPERATION;
  limit?: number;
  type?: RECOMMENDATION_TYPE;
};
