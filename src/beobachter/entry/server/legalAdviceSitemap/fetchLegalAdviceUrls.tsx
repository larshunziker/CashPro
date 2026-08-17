import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  LEGAL_ADVICE_PATH,
  SITEMAP_PAGE_SIZE,
  SITEMAP_WILDCARD_QUERY,
} from './constants';
/* @ts-ignore TODO: TS7016 -> Could not find a declaration file for module './queries'. */
import { GET_LEGAL_ADVICE_SITEMAP_DATA } from './queries';

export type LegalAdviceSitemapArticle = {
  id: string;
  fileName?: string | null;
  filePath?: string | null;
  lastModified?: number | null;
};

type LegalAdviceSitemapQueryResult = {
  legalAdvice?: {
    articlesSearchResults?: {
      articles?: Array<LegalAdviceSitemapArticle>;
      resultsNav?: {
        totalResults: number;
        resultsEnd: number;
      };
    };
  };
};

export const fetchLegalAdviceUrls = async (
  client: ApolloClient<NormalizedCacheObject>,
): Promise<LegalAdviceSitemapArticle[]> => {
  const articles: LegalAdviceSitemapArticle[] = [];
  let offset = 0;
  let hasMoreResults = true;

  while (hasMoreResults) {
    const { data } = await client.query<LegalAdviceSitemapQueryResult>({
      query: GET_LEGAL_ADVICE_SITEMAP_DATA,
      variables: {
        path: LEGAL_ADVICE_PATH,
        query: SITEMAP_WILDCARD_QUERY,
        limit: SITEMAP_PAGE_SIZE,
        offset,
        types: '',
        hasKMUAccess: true,
      },
      fetchPolicy: 'no-cache',
    });

    const searchResults = data?.legalAdvice?.articlesSearchResults;
    const resultsNav = searchResults?.resultsNav;

    if (!searchResults || !resultsNav) {
      break;
    }

    searchResults.articles?.forEach((article) => {
      if (article.id) {
        articles.push(article);
      }
    });

    hasMoreResults = resultsNav.resultsEnd < resultsNav.totalResults;
    offset += SITEMAP_PAGE_SIZE;
  }

  return articles;
};
