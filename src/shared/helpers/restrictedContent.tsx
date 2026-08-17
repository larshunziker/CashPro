import { RESTRICTION_STATUS_PAID } from '../constants/content';

export const isRestrictedContent = (restriction: string): boolean =>
  restriction === RESTRICTION_STATUS_PAID;
