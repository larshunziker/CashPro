import { TEASER_LAYOUT_L } from '../../../../../../shared/constants/teaser';
import { TYPE_TEASER } from '../../constants';

export const teaserStage2Items = {
  gridGroups: [
    {
      config: {
        hasContainer: true,
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
