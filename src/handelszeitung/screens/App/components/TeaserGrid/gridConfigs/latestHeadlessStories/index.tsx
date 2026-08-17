import { TYPE_TEASER } from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_XXS } from '../../../../../../../shared/constants/teaser';

export const latestHeadlessStories = {
  gridGroups: [
    {
      config: {
        hasContainer: false,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_XXS,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_XXS,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_XXS,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_XXS,
        },
      ],
    },
  ],
};
