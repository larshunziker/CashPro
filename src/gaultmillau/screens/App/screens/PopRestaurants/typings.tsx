import { WithRaschRouter } from '../../../../../shared/@types/gql';

export type PopRestaurantsProps = Partial<RouterProps> &
  Pick<WithRaschRouter, 'data' | 'loading'> & {
    popCity?: string;
    language?: 'fr' | 'de';
    /* @ts-ignore TODO: TS7008 ->  Member 'renderFilterListItems' implicitly has an 'any' type. */
    renderFilterListItems;
  };

export type CityFilterItem = {
  popCityEnum?: string;
  label: string;
  url: string;
};
