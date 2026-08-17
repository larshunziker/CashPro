import {
  IAV_1,
  MHPA_2,
  MPA_3,
  WIDEBOARD_2,
  WIDEBOARD_3,
} from '../../../../../shared/constants/adZone';

export const AD_PLACEMENT_SLOTS_ARTICLE = {
  mobile: {
    sequence: [IAV_1, MHPA_2],
    repeater: MHPA_2,
    last: MPA_3,
  },
  tabletDesktop: {
    sequence: [IAV_1, WIDEBOARD_2],
    repeater: WIDEBOARD_2,
    last: WIDEBOARD_3,
  },
};
