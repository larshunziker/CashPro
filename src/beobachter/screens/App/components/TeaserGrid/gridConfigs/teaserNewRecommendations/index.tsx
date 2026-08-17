import { TYPE_TEASER } from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_MD } from '../../../../../../../shared/constants/teaser';

export const teaserNewRecommendations = {
  gridGroups: [
    {
      config: {
        hasContainer: false,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MD,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MD,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MD,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MD,
        },
      ],
    },
  ],
};
