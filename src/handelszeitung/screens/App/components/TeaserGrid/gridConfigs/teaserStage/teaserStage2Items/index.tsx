import { TYPE_TEASER } from '../../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_L } from '../../../../../../../../shared/constants/teaser';

export const teaserStage2Items = {
  gridGroups: [
    {
      config: {
        hasContainer: false,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_L,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_L,
        },
      ],
    },
  ],
};
