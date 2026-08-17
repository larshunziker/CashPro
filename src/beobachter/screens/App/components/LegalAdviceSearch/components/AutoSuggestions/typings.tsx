export type LegalAdviceSearchSuggestionsQuery = {
  searchQuery: string;
};
export type LegalAdviceSearchSuggestion = {
  name: string;
  type: string;
};
export type LegalAdviceSuggestionsApiResponse = {
  suggestionsResults: LegalAdviceSearchSuggestion[];
  query: string;
};
export type LegalAdviceSearchSuggestions = {
  data: LegalAdviceSuggestionsApiResponse;
  loading: boolean;
  error: string | null;
};
