import {
  KeyboardEventHandler,
  LegacyRef,
  MouseEventHandler,
  SyntheticEvent,
} from 'react';
import { IntlFormatters } from 'react-intl';

export type SearchFormProps = {
  initialQuery?: string;
  placeholder?: string;
  addClass?: string;
  focusOnMount?: boolean;
  data: ApolloData & {
    globalSearch: SearchableUnionGraphList;
    environment: QueryRoot & {
      citySearch: SearchableUnionGraphList;
      restaurantsSearch: SearchableUnionGraphList;
    };
  };
  handleSubmit: (event: SyntheticEvent) => void;
  isInitialQueryValid: boolean;
  searchInputRef: LegacyRef<HTMLInputElement>;
  searchQuery: string;
  resetSearchQuery: () => void;
  updateSearchQuery: () => void;
  isAutocompleteVisible: boolean;
  onKeyDownHandler: KeyboardEventHandler;
  renderAutocompleteItems: () => JSX.Element;
  disableGrid: boolean;
  intl: IntlFormatters;
  hideSearch: MouseEventHandler<HTMLDivElement>;
  onSubmitRoute: string;
};
