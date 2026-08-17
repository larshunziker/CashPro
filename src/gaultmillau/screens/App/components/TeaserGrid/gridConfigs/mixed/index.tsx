import { TYPE_TEASER } from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_ML } from '../../../../../../../shared/constants/teaser';
import { PIANO_CONTAINER } from '../constants';

export const mixed = {
  gridGroups: [
    {
      config: {
        hasContainer: true,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_ML,
          downloadPriority: 'high',
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_ML,
          downloadPriority: 'high',
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_ML,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_ML,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_ML,
        },
        {
          type: PIANO_CONTAINER,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_ML,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_ML,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_ML,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_ML,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_ML,
        },
      ],
    },
  ],
};
