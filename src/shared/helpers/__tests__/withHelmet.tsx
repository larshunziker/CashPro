import { getParselyTags } from '../withHelmet';
import articleMockData from './mockData/articleMockData.json';

describe('[withHelmet]', () => {
  it('Should add parselyTags correctly', () => {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.locationOrigin = 'https://www.rasch-stack.ch';
    const article = articleMockData.environment.routeByPath.object;
    const authors = article.authors;
    const keywords = article.keywords;
    const result = getParselyTags(
      article,
      article.title,
      'someImageUrl',
      authors.edges,
      keywords.edges,
      {
        pathname: articleMockData.environment.routeByPath.preferred,
        query: { page: 0 },
      },
    );
    expect(result).toMatchSnapshot();
  });
});
