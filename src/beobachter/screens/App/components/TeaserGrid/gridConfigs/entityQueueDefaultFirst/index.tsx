import {
  TYPE_AD,
  TYPE_RIGHT_WIDGET,
  TYPE_TEASER,
} from '../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import { MMR_1 } from '../../../../../../../shared/constants/adZone';
import { TEASER_LAYOUT_HERO_NEW } from '../../../../../../../shared/constants/teaser';
import { TEASER_LAYOUT_MOBILE_HERO_NEW_TO_DESKTOP_WIDE } from '../../../../../../shared/constants/teaser';

export const entityQueueDefaultFirst = {
  gridGroups: [
    {
      config: {
        hasContainer: true,
      },
      items: [
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_HERO_NEW,
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
          teaserType: TEASER_LAYOUT_MOBILE_HERO_NEW_TO_DESKTOP_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MOBILE_HERO_NEW_TO_DESKTOP_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MOBILE_HERO_NEW_TO_DESKTOP_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MOBILE_HERO_NEW_TO_DESKTOP_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MOBILE_HERO_NEW_TO_DESKTOP_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MOBILE_HERO_NEW_TO_DESKTOP_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MOBILE_HERO_NEW_TO_DESKTOP_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MOBILE_HERO_NEW_TO_DESKTOP_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MOBILE_HERO_NEW_TO_DESKTOP_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MOBILE_HERO_NEW_TO_DESKTOP_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MOBILE_HERO_NEW_TO_DESKTOP_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MOBILE_HERO_NEW_TO_DESKTOP_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MOBILE_HERO_NEW_TO_DESKTOP_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MOBILE_HERO_NEW_TO_DESKTOP_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MOBILE_HERO_NEW_TO_DESKTOP_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MOBILE_HERO_NEW_TO_DESKTOP_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MOBILE_HERO_NEW_TO_DESKTOP_WIDE,
        },
        {
          type: TYPE_TEASER,
          teaserType: TEASER_LAYOUT_MOBILE_HERO_NEW_TO_DESKTOP_WIDE,
        },
        {
          type: TYPE_RIGHT_WIDGET,
        },
      ],
    },
  ],
};
