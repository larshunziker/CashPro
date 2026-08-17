import {
  getChannelTagKeys,
  getPushNotificationSubCatValue,
  isLikelyArticleSlug,
  sanitizeOneSignalTagKey,
} from '../getPushNotificationSubCatValue';

describe('getPushNotificationSubCatValue', () => {
  it('returns homepage for root path', () => {
    expect(
      getPushNotificationSubCatValue({
        pathname: '/',
        channelHierarchy: null,
      }),
    ).toBe('homepage');
    expect(
      getPushNotificationSubCatValue({
        pathname: '',
        channelHierarchy: null,
      }),
    ).toBe('homepage');
  });

  it('uses deepest channel title from hierarchy', () => {
    expect(
      getPushNotificationSubCatValue({
        pathname: '/article/123',
        channelHierarchy: ['Börse', 'Fonds / ETF'],
      }),
    ).toBe('fonds_etf');
  });

  it('uses the last non-slug URL segment when hierarchy is missing', () => {
    expect(
      getPushNotificationSubCatValue({
        pathname: '/aktien/finanzen/nestle-aktie-steigt',
        channelHierarchy: null,
      }),
    ).toBe('finanzen');
  });

  it('uses the slug itself when it is the only URL segment', () => {
    expect(
      getPushNotificationSubCatValue({
        pathname: '/nestle-aktie-steigt',
        channelHierarchy: null,
      }),
    ).toBe('nestle-aktie-steigt');
  });

  it('sanitizes the resolved URL segment', () => {
    expect(
      getPushNotificationSubCatValue({
        pathname: '/some/Foo Bar!$Baz',
        channelHierarchy: null,
      }),
    ).toBe('foo_bar_baz');
  });
});

describe('sanitizeOneSignalTagKey', () => {
  it('lowercases and replaces invalid characters', () => {
    expect(sanitizeOneSignalTagKey('Foo-Bar')).toBe('foo-bar');
    expect(sanitizeOneSignalTagKey('a b  c')).toBe('a_b_c');
  });
});

describe('isLikelyArticleSlug', () => {
  it('flags segments with 2+ hyphens', () => {
    expect(isLikelyArticleSlug('nestle-aktie-steigt')).toBe(true);
    expect(isLikelyArticleSlug('a-b-c-d')).toBe(true);
  });

  it('keeps single-hyphen segments (CMS-style "top-news")', () => {
    expect(isLikelyArticleSlug('top-news')).toBe(false);
    expect(isLikelyArticleSlug('aktien')).toBe(false);
    expect(isLikelyArticleSlug('')).toBe(false);
  });
});

describe('getChannelTagKeys', () => {
  it('returns homepage for root', () => {
    expect(
      getChannelTagKeys({ pathname: '/', channelHierarchy: null }),
    ).toEqual(['homepage']);
  });

  it('maps each hierarchy title to a tag key', () => {
    expect(
      getChannelTagKeys({
        pathname: '/any',
        channelHierarchy: ['Unternehmen', 'Test', 'Foo'],
      }),
    ).toEqual(['unternehmen', 'test', 'foo']);
  });

  it('drops slug segments and keeps channel-like segments from the URL', () => {
    expect(
      getChannelTagKeys({
        pathname: '/aktien/finanzen/nestle-aktie-steigt',
        channelHierarchy: null,
      }),
    ).toEqual(['aktien', 'finanzen']);
  });

  it('returns empty when the only segment is a slug', () => {
    expect(
      getChannelTagKeys({
        pathname: '/nestle-aktie-steigt',
        channelHierarchy: null,
      }),
    ).toEqual([]);
  });

  it('keeps single-hyphen segments (CMS-style "top-news")', () => {
    expect(
      getChannelTagKeys({
        pathname: '/news/top-news',
        channelHierarchy: null,
      }),
    ).toEqual(['news', 'top-news']);
  });
});
