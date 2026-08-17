import { RecommendationsItem, SplitRecommendationsItems } from '../typings';

export const splitRecommendationsInParts = (
  items: RecommendationsItem[],
  splitIndex: number,
): SplitRecommendationsItems => ({
  part1: items ? items.slice(0, splitIndex) : [],
  part2: items ? items.slice(splitIndex, items.length) : [],
});
