import { SearchCategory } from '../../screens/Search/typings';

export type SearchResultsProps = {
  searchQuery: string;
  category: SearchCategory;
  data: ApolloData &
    Query & {
      textSearch: SearchResults;
      wikifolio: IntegrationsResults;
      newEmission: IntegrationsResults;
    };
  page: number;
};
