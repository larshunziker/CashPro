import { WithRaschRouter } from '../../../../../shared/@types/gql';
import { PROVINCE_ENUM } from './constants';

export type AmericanExpressRestaurantsProps = Partial<RouterProps> &
  Pick<WithRaschRouter, 'data' | 'loading'> & {
    province?: string;
    language?: 'de';
    renderFilterListItems: any;
  };

export type ProvinceFilterItem = {
  amexProvinceEnum?: PROVINCE_ENUM;
  label: string;
  url: string;
};
