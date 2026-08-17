import {
  buildArticleUrl,
  buildSitemapXml,
  formatLastmod,
} from '../buildSitemapXml';

describe('buildSitemapXml', () => {
  it('builds valid urlset XML with lastmod from article lastModified', () => {
    const xml = buildSitemapXml(
      [
        { id: 'article-1', lastModified: 1700000000 },
        { id: 'article&2', lastModified: 1700000001000 },
      ],
      'https://www.beobachter.ch',
    );

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    );
    expect(xml).toContain(
      '<loc>https://www.beobachter.ch/beratung/rechtsratgeber/article-1</loc>',
    );
    expect(xml).toContain(
      `<lastmod>${new Date(1700000000 * 1000).toISOString()}</lastmod>`,
    );
    expect(xml).toContain(
      '<loc>https://www.beobachter.ch/beratung/rechtsratgeber/article&amp;2</loc>',
    );
    expect(xml).toContain(
      `<lastmod>${new Date(1700000001000).toISOString()}</lastmod>`,
    );
  });

  it('omits lastmod when lastModified is missing', () => {
    const xml = buildSitemapXml(
      [{ id: 'article-1' }],
      'https://www.beobachter.ch',
    );

    expect(xml).not.toContain('<lastmod>');
    expect(xml).toContain(
      '<loc>https://www.beobachter.ch/beratung/rechtsratgeber/article-1</loc>',
    );
  });

  it('returns empty urlset when no articles are provided', () => {
    const xml = buildSitemapXml([], 'https://www.beobachter.ch');

    expect(xml).toBe(
      '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n</urlset>',
    );
  });
});

describe('formatLastmod', () => {
  it('formats unix seconds as ISO datetime', () => {
    expect(formatLastmod(1700000000)).toBe(
      new Date(1700000000 * 1000).toISOString(),
    );
  });

  it('formats unix milliseconds as ISO datetime', () => {
    expect(formatLastmod(1700000001000)).toBe(
      new Date(1700000001000).toISOString(),
    );
  });

  it('returns null for invalid values', () => {
    expect(formatLastmod(null)).toBeNull();
    expect(formatLastmod(undefined)).toBeNull();
    expect(formatLastmod(Number.NaN)).toBeNull();
  });
});

describe('buildArticleUrl', () => {
  it('builds article URLs under the LegalAdvice route', () => {
    expect(buildArticleUrl('https://www.beobachter.ch', 'ABC123')).toBe(
      'https://www.beobachter.ch/beratung/rechtsratgeber/ABC123',
    );
  });
});
