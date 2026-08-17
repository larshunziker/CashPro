import { Request, Response } from 'express';
import { buildSitemapXml } from './buildSitemapXml';
import {
  createServerApolloClient,
  getBaseUrl,
} from './createServerApolloClient';
import { fetchLegalAdviceUrls } from './fetchLegalAdviceUrls';
import {
  SITEMAP_CACHE_MAX_AGE_SECONDS,
  SITEMAP_CACHE_TTL_MS,
} from './constants';

type SitemapCacheEntry = {
  expiresAt: number;
  xml: string;
};

let sitemapCache: SitemapCacheEntry | null = null;

export const legalAdviceSitemapHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (sitemapCache && Date.now() < sitemapCache.expiresAt) {
      res
        .set(
          'Cache-Control',
          `public, max-age=${SITEMAP_CACHE_MAX_AGE_SECONDS}`,
        )
        .type('application/xml')
        .send(sitemapCache.xml);
      return;
    }

    const startedAt = Date.now();
    const apolloClient = createServerApolloClient(req);
    const articles = await fetchLegalAdviceUrls(apolloClient);
    const xml = buildSitemapXml(articles, getBaseUrl(req));

    sitemapCache = {
      xml,
      expiresAt: Date.now() + SITEMAP_CACHE_TTL_MS,
    };

    // eslint-disable-next-line no-console
    console.log('[LegalAdviceSitemap] generated', {
      urlCount: articles.length,
      durationMs: Date.now() - startedAt,
    });

    res
      .set('Cache-Control', `public, max-age=${SITEMAP_CACHE_MAX_AGE_SECONDS}`)
      .type('application/xml')
      .send(xml);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[LegalAdviceSitemap] generation failed', error);
    res.status(500).send('Error generating sitemap');
  }
};
