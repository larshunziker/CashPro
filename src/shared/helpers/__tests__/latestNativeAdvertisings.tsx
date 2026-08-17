import { latestNativeAdvertisingsGenerator } from '../latestNativeAdvertisings';
import { RECOMMENDATION_OPERATION } from '../../constants/recommendations';

const generateItem = (index: number) => ({
  node: {
    id: `id-${index}`,
    gcid: `gcid-${index}`,
    __typename: 'NativeAdvertising',
  },
});

const RECOMMENDATIONS_LENGTH = 4;

describe('[Function] latestNativeAdvertisings ', () => {
  it('Should return items correctly', () => {
    const recommendationItems = Array(RECOMMENDATIONS_LENGTH)
      .fill(0)
      .map((_, index) => generateItem(index + 1));

    const latestRecommendations = latestNativeAdvertisingsGenerator({
      [RECOMMENDATION_OPERATION.LATEST_NATIVE_ADVERTISINGS]: {
        items: recommendationItems,
        metaData: {
          contentId: 'id-content-1',
          correlationId: '',
          type: '',
        },
      },
    });

    recommendationItems.forEach((recommendationItem) => {
      expect(latestRecommendations.next().value).toStrictEqual({
        id: recommendationItem.node.id,
        gcid: recommendationItem.node.gcid,
        __typename: recommendationItem.node.__typename,
      });
    });

    expect(latestRecommendations.next().value).toBe(false);
  });
});
