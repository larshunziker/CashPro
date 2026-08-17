import { ORGANIZATION_CONTENT_TYPE } from '../../../../../shared/constants/content';

export const PAGE_SIZE = 10;
export const SEARCH_ORGANIZATION_TYPE = 'Pop';
export const ORGANIZATION_TYPE_POP = 'pop';
export const SEARCH_FILTER = ORGANIZATION_CONTENT_TYPE;

// These constants are also used for the PopStage component, check the PopStage in case this Array gets updated
export const DE_CITY_FILTER_LIST = [
  // INFO: The commented cities in the list are currently not displayed in the FE
  // but they are available for the editors in the BE.
  // If we need them in the future to be displayed in the FE (PopStage, Dropdown on /pop), we can just comment them out.
  {
    label: 'Alle Städte',
    url: '/pop',
  },
  {
    label: 'Basel',
    url: '/pop/basel',
  },
  {
    label: 'Bern',
    url: '/pop/bern',
  },
  {
    label: 'Fribourg',
    url: '/pop/fribourg',
  },
  {
    label: 'Genf',
    url: '/pop/genf',
  },
  {
    label: 'Gstaad',
    url: '/pop/gstaad',
  },
  {
    label: 'Lausanne',
    url: '/pop/lausanne',
  },
  {
    label: 'Luzern',
    url: '/pop/luzern',
  },
  {
    label: 'Neuenburg',
    url: '/pop/neuenburg',
  },
  {
    label: 'St. Gallen',
    url: '/pop/stgallen',
  },
  {
    label: 'St. Moritz',
    url: '/pop/stmoritz',
  },
  {
    label: 'Zermatt',
    url: '/pop/zermatt',
  },
  {
    label: 'Zürich',
    url: '/pop/zurich',
  },
  {
    label: 'Übrige Schweiz',
    url: '/pop/uebrigeschweiz',
  },
];

export const FR_CITY_FILTER_LIST = [
  {
    label: 'Toutes les villes',
    url: '/fr/pop',
  },
  {
    label: 'Berne',
    url: '/fr/pop/berne',
  },
  {
    label: 'Fribourg',
    url: '/fr/pop/fribourg',
  },
  {
    label: 'Genève',
    url: '/fr/pop/geneve',
  },
  {
    label: 'Lausanne',
    url: '/fr/pop/lausanne',
  },
  {
    label: 'Neuchâtel',
    url: '/fr/pop/neuchatel',
  },
  {
    label: 'Zurich',
    url: '/fr/pop/zurich',
  },
  // {
  //   label: 'St. Moritz',
  //   url: '/fr/pop/stmoritz',
  // },
];
