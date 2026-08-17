import type { OneSignalClientForVisitTags } from './types';

const ensureNumericString = (value: unknown): string => {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }
  return '0';
};

/**
 * Builds `{ [tagKey]: nextCount }` for each key, reading current numeric values from OneSignal user tags.
 */
export const incrementPageViewCounts = (
  oneSignal: OneSignalClientForVisitTags,
  keys: string[],
): Record<string, string> => {
  const existing = oneSignal.User.getTags() || {};
  const newTags: Record<string, string> = {};
  for (const key of keys) {
    if (!key) {
      continue;
    }
    const prev = Number.parseInt(ensureNumericString(existing[key]), 10);
    const next = Number.isFinite(prev) && prev >= 0 ? prev + 1 : 1;
    newTags[key] = String(next);
  }
  return newTags;
};
