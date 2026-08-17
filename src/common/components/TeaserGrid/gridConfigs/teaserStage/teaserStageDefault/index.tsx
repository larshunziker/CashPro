import { TYPE_TEASER } from '../../constants';
import { TEASER_LAYOUT_S } from '../../../../../../shared/constants/teaser';

export const teaserStageDefault = {
  gridGroups: [
    {
      config: {
        hasContainer: true,
      },
      items: [
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
