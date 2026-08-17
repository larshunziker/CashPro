import { TYPE_TEASER } from '../../constants';
import { TEASER_LAYOUT_PORTRAIT } from '../../../../../../shared/constants/teaser';

export const teaserStage3Items = {
  gridGroups: [
    {
      config: {
        hasContainer: true,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_PORTRAIT,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_PORTRAIT,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_PORTRAIT,
        },
      ],
    },
  ],
};
