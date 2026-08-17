import {
  GLOBAL_SEARCH_SORT_BY_DATE,
  GLOBAL_SEARCH_SORT_BY_RELEVANCE,
} from '../../../../../../../shared/constants/globalSearch';
import { SortItem } from './typings';

export const sortItems: SortItem[] = [
  {
    name: 'Relevanz',
    sort: GLOBAL_SEARCH_SORT_BY_RELEVANCE,
  },
  {
    name: 'Aktualität',
    sort: GLOBAL_SEARCH_SORT_BY_DATE,
  },
];
