import { LegalAdviceSitemapArticle } from './fetchLegalAdviceUrls';
import { ROUTE_LEGAL_ADVICE } from '../../../screens/App/constants';

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const buildArticleUrl = (
  normalizedBaseUrl: string,
  articleId: string,
): string => {
  return `${normalizedBaseUrl}/${ROUTE_LEGAL_ADVICE}/${articleId}`;
};

/** Formats GraphQL lastModified (unix seconds or ms) as W3C Datetime for sitemap lastmod. */
export const formatLastmod = (lastModified?: number | null): string | null => {
  if (
    lastModified === undefined ||
    lastModified === null ||
    !Number.isFinite(lastModified)
  ) {
    return null;
  }

  // Values below 1e12 are treated as seconds; larger values as milliseconds.
  const timestampMs = lastModified < 1e12 ? lastModified * 1000 : lastModified;
  const date = new Date(timestampMs);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
};
const formatAttachmentUrl = (
  normalizedBaseUrl: string,
  article: LegalAdviceSitemapArticle,
): string | null => {
  if (!article.filePath || !article.fileName) {
    return null;
  }
  return escapeXml(
    normalizedBaseUrl +
      '/_/api/attachments/prod/get?path=' +
      encodeURIComponent(article.filePath.replace('prod/', '')) +
      '&filename=' +
      encodeURIComponent(article.fileName),
  );
};
export const buildSitemapXml = (
  articles: LegalAdviceSitemapArticle[],
  baseUrl: string,
): string => {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, '');

  const urlEntries = articles
    .map((article) => {
      const loc = escapeXml(buildArticleUrl(normalizedBaseUrl, article.id));
      const lastmod = formatLastmod(article.lastModified);
      const lastmodLine = lastmod
        ? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>`
        : '';
      const attachmentUrl = formatAttachmentUrl(normalizedBaseUrl, article);
      let attachmentLine = '';
      if (attachmentUrl) {
        attachmentLine = `\n<url>\n    <loc>${attachmentUrl}</loc>${lastmodLine}\n   <destination>${loc}</destination>\n</url>`;
      }
      return `  <url>\n    <loc>${loc}</loc>${lastmodLine}\n  </url>${attachmentLine}`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`;
};
