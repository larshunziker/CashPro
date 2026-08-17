import { TYPE_TEASER } from '../../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_M } from '../../../../../../../../shared/constants/teaser';

export const teaserStageDefault = {
  gridGroups: [
    {
      config: {
        hasContainer: false,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_M,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_M,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_M,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_M,
        },
      ],
    },
  ],
};
