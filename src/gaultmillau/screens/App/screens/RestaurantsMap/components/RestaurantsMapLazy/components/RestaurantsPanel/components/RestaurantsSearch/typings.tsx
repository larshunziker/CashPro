import { IntlFormatters } from 'react-intl';

export type RestaurantsSearchProps = {
  intl: IntlFormatters;
  query: string;
};

export type HandleSubmitProps = {
  query: string;
  language: string;
  navigate: (props: string) => void;
};
