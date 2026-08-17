import {
  BOTTOM_AD,
  DETAILS_AD,
  IAV,
  INDEX_AD,
  MHPA,
  MMR,
  MPA,
  MR,
  PREROLL,
  RIGHT_AD,
  SBA,
  SIDE_RIGHT_AD,
  TOP_AD,
  WB,
} from './ads';

// NEW AD SLOT NAMINGS
export const TOP_AD_1 = `${TOP_AD}1`; // desktop | tablet: WB_1 / mobile: MMR_1
export const RIGHT_AD_1 = `${RIGHT_AD}1`; // desktop | tablet: SBA_1 / mobile: –
export const SIDE_RIGHT_AD_1 = `${SIDE_RIGHT_AD}1`; // desktop | tablet: MR_1-HPA / mobile: –
export const DETAILS_AD_1 = `${DETAILS_AD}1`; // desktop | tablet: IAV_1 / mobile: IAV_1
export const DETAILS_AD_2 = `${DETAILS_AD}2`; // desktop | tablet: LB_2-MR / mobile: MHPA_2:MPA_2-MHPA
export const DETAILS_AD_3 = `${DETAILS_AD}3`; // desktop | tablet: IAV_2 / mobile: IAV_2
export const INDEX_AD_1 = `${INDEX_AD}1`; // desktop | tablet: WB_2-MR / mobile: MHPA_2:MPA_2-MHPA
export const BOTTOM_AD_1 = `${BOTTOM_AD}1`; // desktop | tablet: WB_3-MR / mobile: MPA_3
export const PREROLL_1 = `${PREROLL}1`;

// desktop
export const WB_1 = `${WB}1`;
export const SBA_1 = `${SBA}1`;
export const MR_1 = `${MR}1`;
export const IAV_1 = `${IAV}1`;
export const IAV_2 = `${IAV}2`;
export const WIDEBOARD_2 = `${WB}2-${MR}`; // WB_2-MR
export const WIDEBOARD_3 = `${WB}3-${MR}`; // WB_3-MR

// mobile
export const MMR_1 = `${MMR}1`;
export const MHPA_2 = `${MHPA}2`;
export const MHPA_3 = `${MHPA}3`;
export const MPA_3 = `${MPA}3`;
export const MPA_4 = `${MPA}4`;

// desktop & mobile

export const DEBOUNCE_TIME = 300; // debounce all observed node mutations for X ms
