import { TYPE_TEASER } from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_S } from '../../../../../../../shared/constants/teaser';
import { TYPE_DIVIDER } from '../constants';

export const homeBodyAndHealthFamilyBottom = {
  gridGroups: [
    {
      config: {
        hasContainer: true,
      },
      items: [
        {
          type: TYPE_DIVIDER,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_S,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_S,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_S,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_S,
        },
      ],
    },
  ],
};
