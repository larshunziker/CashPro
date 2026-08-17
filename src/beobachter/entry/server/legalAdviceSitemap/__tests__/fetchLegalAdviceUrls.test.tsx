import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { fetchLegalAdviceUrls } from '../fetchLegalAdviceUrls';

jest.mock('../queries', () => ({
  GET_LEGAL_ADVICE_SITEMAP_DATA: 'GET_LEGAL_ADVICE_SITEMAP_DATA',
}));

describe('fetchLegalAdviceUrls', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('paginates until resultsEnd reaches totalResults without deduplicating', async () => {
    const query = jest
      .fn()
      .mockResolvedValueOnce({
        data: {
          legalAdvice: {
            articlesSearchResults: {
              articles: [
                { id: 'a1', lastModified: 1700000000 },
                { id: 'a2', lastModified: 1700000001 },
              ],
              resultsNav: { totalResults: 3, resultsEnd: 2 },
            },
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          legalAdvice: {
            articlesSearchResults: {
              articles: [
                { id: 'a2', lastModified: 1700000001 },
                { id: 'a3', lastModified: 1700000002 },
              ],
              resultsNav: { totalResults: 3, resultsEnd: 3 },
            },
          },
        },
      });

    const client = { query } as unknown as ApolloClient<NormalizedCacheObject>;
    const articles = await fetchLegalAdviceUrls(client);

    expect(articles).toEqual([
      { id: 'a1', lastModified: 1700000000 },
      { id: 'a2', lastModified: 1700000001 },
      { id: 'a2', lastModified: 1700000001 },
      { id: 'a3', lastModified: 1700000002 },
    ]);
    expect(query).toHaveBeenCalledTimes(2);
    expect(query.mock.calls[0][0].variables.offset).toBe(0);
    expect(query.mock.calls[1][0].variables.offset).toBe(5000);
  });

  it('returns empty list when search results are missing', async () => {
    const client = {
      query: jest.fn().mockResolvedValue({ data: { legalAdvice: null } }),
    } as unknown as ApolloClient<NormalizedCacheObject>;

    await expect(fetchLegalAdviceUrls(client)).resolves.toEqual([]);
  });
});
