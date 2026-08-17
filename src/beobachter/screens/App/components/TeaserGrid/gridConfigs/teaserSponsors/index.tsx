import {
  TYPE_AD,
  TYPE_TEASER,
} from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { MMR_1 } from '../../../../../../../shared/constants/adZone';
import { TEASER_LAYOUT_SPONSOR } from '../../../../../../../shared/constants/teaser';

export const teaserSponsors = {
  gridGroups: [
    {
      config: {
        hasContainer: false,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SPONSOR,
        },
        {
          type: TYPE_AD,
          adConfig: [
            { slot: MMR_1, isMultiPlacement: false, deviceType: 'mobile' },
          ],
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SPONSOR,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SPONSOR,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SPONSOR,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SPONSOR,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SPONSOR,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SPONSOR,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SPONSOR,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SPONSOR,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SPONSOR,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SPONSOR,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SPONSOR,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SPONSOR,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SPONSOR,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SPONSOR,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SPONSOR,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SPONSOR,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_SPONSOR,
        },
      ],
    },
  ],
};
