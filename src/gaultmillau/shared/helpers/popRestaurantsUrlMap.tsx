/**
 * @file   pop restaurants url map
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @date   2018-09-07
 *
 */

import { CityFilterItem } from '../../screens/App/screens/PopRestaurants/typings';

// this function is exported and used in server/index.js to handel the special filtered urls and catch 404
/* @ts-ignore TODO: TS7006 ->  Parameter 'city' implicitly has an 'any' type. */
export const mapUrlToPopCityEnum = (city, language = 'de'): CityFilterItem => {
  const isFrenchLanguage = language === 'fr';
  switch (city) {
    case '':
      return {
        popCityEnum: 'All',
        label: isFrenchLanguage ? 'Toutes les villes' : 'Alle Städte',
        url: isFrenchLanguage ? '/fr/pop' : '/pop',
      };
    case 'ailleurs':
      return {
        popCityEnum: 'Ailleurs',
        label: 'Ailleurs',
        url: '/pop/ailleurs',
      };
    case 'bale':
      return {
        popCityEnum: 'Bale',
        label: 'Bâle',
        url: '/fr/pop/bale',
      };
    case 'basel':
      return {
        popCityEnum: 'Basel',
        label: 'Basel',
        url: '/pop/basel',
      };
    case 'bern':
      return {
        popCityEnum: 'Bern',
        label: 'Bern',
        url: '/pop/bern',
      };
    case 'berne':
      return {
        popCityEnum: 'Berne',
        label: 'Berne',
        url: '/fr/pop/berne',
      };
    case 'fribourg':
      return {
        popCityEnum: 'Fribourg',
        label: 'Fribourg',
        url: isFrenchLanguage ? '/fr/pop/fribourg' : '/pop/fribourg',
      };
    case 'geneve':
      return {
        popCityEnum: 'Geneve',
        label: 'Genève',
        url: '/fr/pop/geneve',
      };
    case 'genf':
      return {
        popCityEnum: 'Genf',
        label: 'Genf',
        url: '/pop/genf',
      };
    case 'gstaad':
      return {
        popCityEnum: 'Gstaad',
        label: 'Gstaad',
        url: isFrenchLanguage ? '/fr/pop/gstaad' : '/pop/gstaad',
      };
    case 'lausanne':
      return {
        popCityEnum: 'Lausanne',
        label: 'Lausanne',
        url: isFrenchLanguage ? '/fr/pop/lausanne' : '/pop/lausanne',
      };
    case 'lucerne':
      return {
        popCityEnum: 'Lucerne',
        label: 'Lucerne',
        url: '/fr/pop/lucerne',
      };
    case 'luzern':
      return {
        popCityEnum: 'Luzern',
        label: 'Luzern',
        url: '/pop/luzern',
      };
    case 'neuchatel':
      return {
        popCityEnum: 'Neuchatel',
        label: 'Neuchâtel',
        url: '/fr/pop/neuchatel',
      };
    case 'neuenburg':
      return {
        popCityEnum: 'Neuenburg',
        label: 'Neuenburg',
        url: '/pop/neuenburg',
      };
    case 'stgallen':
      return {
        popCityEnum: 'StGallen',
        label: 'St. Gallen',
        url: '/pop/stgallen',
      };
    case 'stmoritz':
      return {
        popCityEnum: 'StMoritz',
        label: 'St. Moritz',
        url: isFrenchLanguage ? '/fr/pop/stmoritz' : '/pop/stmoritz',
      };
    case 'uebrigeschweiz':
      return {
        popCityEnum: 'UebrigeSchweiz',
        label: 'Übrige Schweiz',
        url: '/pop/uebrigeschweiz',
      };
    case 'zermatt':
      return {
        popCityEnum: 'Zermatt',
        label: 'Zermatt',
        url: isFrenchLanguage ? '/fr/pop/zermatt' : '/pop/zermatt',
      };
    case 'zurich':
      return {
        popCityEnum: 'Zurich',
        label: isFrenchLanguage ? 'Zurich' : 'Zürich',
        url: isFrenchLanguage ? '/fr/pop/zurich' : '/pop/zurich',
      };
    default:
      return {
        popCityEnum: '',
        label: '',
        url: '',
      };
  }
};
