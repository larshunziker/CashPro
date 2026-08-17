import { TYPE_TEASER } from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_RECOMMENDATIONS } from '../../../../../../../shared/constants/teaser';

export const teaserRecommendations = {
  gridGroups: [
    {
      config: {
        hasContainer: false,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_RECOMMENDATIONS,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_RECOMMENDATIONS,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_RECOMMENDATIONS,
        },
      ],
    },
  ],
};
