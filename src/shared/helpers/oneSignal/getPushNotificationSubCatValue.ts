/** Normalizes a path segment for use as a OneSignal tag key (lowercase, safe charset). */
export const sanitizeOneSignalTagKey = (segment: string): string => {
  const s = segment.trim().toLowerCase().replaceAll(/\s+/g, '_');
  const safe = s
    .replaceAll(/[^a-z0-9_-]/g, '_')
    .replaceAll(/_+/g, '_')
    .replaceAll(/(?:^_|_$)/g, '');
  return safe || '_';
};

const isHomepagePath = (pathname: string): boolean => {
  const normalized = (pathname || '').replace(/\/$/, '');
  return normalized === '' || normalized === '/';
};

const extractPathSegments = (pathname: string): string[] =>
  (pathname || '')
    .split('?')[0]
    .split('#')[0]
    .replaceAll(/(?:^\/+|\/+$)/g, '')
    .split('/')
    .filter(Boolean);

/**
 * Heuristic: treat segments with 2+ hyphens as article slugs (e.g. `nestle-aktie-steigt`).
 * Single-hyphen segments are kept because CMS channels often look like `top-news`.
 */
const SLUG_HYPHEN_THRESHOLD = 2;

export const isLikelyArticleSlug = (segment: string): boolean => {
  if (!segment) {
    return false;
  }
  const hyphenCount = (segment.match(/-/g) || []).length;
  return hyphenCount >= SLUG_HYPHEN_THRESHOLD;
};

/**
 * Ordered, de-duplicated tag keys for each channel level. Visit counters use this set.
 *
 * - Homepage (`/`) → `["homepage"]`
 * - CMS hierarchy present → one sanitized key per hierarchy title
 * - No hierarchy → URL path segments **excluding** slug-like segments
 *   (e.g. `/aktien/finanzen/nestle-aktie-steigt` → `["aktien", "finanzen"]`).
 *   When nothing remains after slug filtering, returns `[]` so no visit
 *   counter is incremented for slug-only routes (e.g. `/nestle-aktie-steigt`).
 */
export const getChannelTagKeys = (options: {
  pathname: string;
  channelHierarchy: string[] | null | undefined;
}): string[] => {
  if (isHomepagePath(options.pathname)) {
    return [sanitizeOneSignalTagKey('homepage')];
  }

  const seen = new Set<string>();
  const keys: string[] = [];

  if (options.channelHierarchy?.length) {
    for (const title of options.channelHierarchy) {
      const key = sanitizeOneSignalTagKey(title);
      if (key && !seen.has(key)) {
        seen.add(key);
        keys.push(key);
      }
    }
    return keys;
  }

  for (const segment of extractPathSegments(options.pathname)) {
    if (isLikelyArticleSlug(segment)) {
      continue;
    }
    const key = sanitizeOneSignalTagKey(segment);
    if (key && !seen.has(key)) {
      seen.add(key);
      keys.push(key);
    }
  }
  return keys;
};

/**
 * Derives the OneSignal `sub_cat` tag.
 *
 * - Homepage (`/`) → `"homepage"`
 * - Hierarchy present → deepest channel title (sanitized)
 * - No hierarchy, URL has channel-like segments → last **non-slug** segment
 *   (e.g. `/aktien/finanzen/nestle-aktie-steigt` → `"finanzen"`)
 * - No hierarchy, URL has only a slug → that slug sanitized — note that
 *   `sanitizeOneSignalTagKey` keeps hyphens, so the value preserves them
 *   (e.g. `/nestle-aktie-steigt` → `"nestle-aktie-steigt"`).
 * - Empty / unknown path → `null`
 */
export const getPushNotificationSubCatValue = (options: {
  pathname: string;
  channelHierarchy: string[] | null | undefined;
}): string | null => {
  if (isHomepagePath(options.pathname)) {
    return 'homepage';
  }

  const deepestTitle = options.channelHierarchy?.at(-1)?.trim();
  if (deepestTitle) {
    return sanitizeOneSignalTagKey(deepestTitle).toLowerCase();
  }

  const segments = extractPathSegments(options.pathname);
  if (segments.length === 0) {
    return null;
  }

  for (let index = segments.length - 1; index >= 0; index -= 1) {
    const segment = segments[index];
    if (!isLikelyArticleSlug(segment)) {
      return sanitizeOneSignalTagKey(segment).toLowerCase();
    }
  }

  return sanitizeOneSignalTagKey(segments.at(-1) as string).toLowerCase();
};
