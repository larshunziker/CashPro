import {
  IAV_1,
  MHPA_2,
  MPA_3,
  WIDEBOARD_2,
  WIDEBOARD_3,
} from '../../components/AppNexus/constants';

export const adPlacementSlots = {
  mobile: {
    sequence: [IAV_1, MHPA_2],
    fallback: MPA_3,
  },
  tabletDesktop: {
    sequence: [IAV_1, WIDEBOARD_2],
    fallback: WIDEBOARD_3,
  },
};
