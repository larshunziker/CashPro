import {
  TYPE_AD,
  TYPE_TEASER,
} from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { TEASER_LAYOUT_PORTRAIT } from '../../../../../../../shared/constants/teaser';
import { MMR_1 } from '../../../AppNexus/constants';

export const teaserPortrait4x4 = {
  gridGroups: [
    {
      config: {
        hasContainer: true,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_PORTRAIT,
          downloadPriority: 'high',
        },
        {
          type: TYPE_AD,
          adConfig: [
            { slot: MMR_1, isMultiPlacement: false, deviceType: 'mobile' },
          ],
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_PORTRAIT,
          downloadPriority: 'high',
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_PORTRAIT,
          downloadPriority: 'high',
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_PORTRAIT,
          downloadPriority: 'high',
        },
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
