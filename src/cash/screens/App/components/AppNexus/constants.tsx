import {
  BOTTOM_AD,
  DETAILS_AD,
  INDEX_AD,
  PREROLL,
  RIGHT_AD,
  SIDE_RIGHT_AD,
  TOP_AD,
} from '../../../../../shared/constants/ads';

// NEW AD NAMINGS
export const TOP_AD_1 = `${TOP_AD}1`; // desktop | tablet: WB_1 / mobile: MMR_1
export const RIGHT_AD_1 = `${RIGHT_AD}1`; // desktop | tablet: SBA_1 / mobile: –
export const SIDE_RIGHT_AD_1 = `${SIDE_RIGHT_AD}1`; // desktop | tablet: MR_1-HPA / mobile: –
export const DETAILS_AD_1 = `${DETAILS_AD}1`; // desktop | tablet: IAV_1 / mobile: IAV_1
export const DETAILS_AD_2 = `${DETAILS_AD}2`; // desktop | tablet: LB_2-MR / mobile: MHPA_2:MPA_2-MHPA
export const DETAILS_AD_3 = `${DETAILS_AD}3`; // desktop | tablet: IAV_2 / mobile: IAV_2
export const INDEX_AD_1 = `${INDEX_AD}1`; // desktop | tablet: WB_2-MR / mobile: MHPA_2:MPA_2-MHPA
export const BOTTOM_AD_1 = `${BOTTOM_AD}1`; // desktop | tablet: WB_3-MR / mobile: MPA_3
export const PREROLL_1 = `${PREROLL}1`;

/* @ts-ignore TODO: TS7006 ->  Parameter 'adSlot' implicitly has an 'any' type. */
export const isContentAd = (adSlot) =>
  [DETAILS_AD_1, DETAILS_AD_2, DETAILS_AD_3, INDEX_AD_1].includes(adSlot);

/* @ts-ignore TODO: TS7006 ->  Parameter 'adSlot' implicitly has an 'any' type. */
export const isIAVSlot = (adSlot) =>
  [DETAILS_AD_1, DETAILS_AD_3].includes(adSlot.slotName);

export const getAdSlotNameByEntryIndex = (index: number) => {
  if (index < 2) {
    return {
      mobile: INDEX_AD_1,
      tabletDesktop: INDEX_AD_1,
    };
  } else if (index > 3 && (index + 2) % 3 === 0) {
    return {
      mobile: INDEX_AD_1,
      tabletDesktop: INDEX_AD_1,
    };
  }

  return null;
};

export const getAdSlotNameByEntryIndexOnError = (index: number) => {
  if (index === 1) {
    return {
      mobile: INDEX_AD_1,
      tabletDesktop: INDEX_AD_1,
    };
  } else if (index > 3 && (index + 2) % 3 === 0) {
    return {
      mobile: INDEX_AD_1,
      tabletDesktop: INDEX_AD_1,
    };
  }

  return null;
};

export const AD_PLACEMENT_SLOTS_ARTICLE = {
  mobile: {
    sequence: [DETAILS_AD_1, DETAILS_AD_2],
    repeater: DETAILS_AD_2,
    last: null,
  },
  tabletDesktop: {
    sequence: [DETAILS_AD_1, DETAILS_AD_2],
    repeater: DETAILS_AD_2,
    last: null,
  },
};

// character count definition for article paragraphs
// example: [IAV, Recos, WB_2, WB_3] (last item is for the repetition)
export const ARTICLE_CHARACTER_COUNTS = {
  mobile: [800, 1400, 3000],
  tabletDesktop: [800, 2000, 3200],
};
