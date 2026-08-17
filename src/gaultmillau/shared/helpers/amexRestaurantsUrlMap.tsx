import { PROVINCE_ENUM } from '../../screens/App/screens/AmexRestaurants/constants';
import { ProvinceFilterItem } from '../../screens/App/screens/AmexRestaurants/typings';

export const mapUrlToAmexProvinceEnum = (
  province: string,
): ProvinceFilterItem => {
  switch (province) {
    case 'ag':
      return {
        amexProvinceEnum: PROVINCE_ENUM.AG,
        label: 'Aargau',
        url: '/americanexpress/ag',
      };
    case 'ai':
      return {
        amexProvinceEnum: PROVINCE_ENUM.AI,
        label: 'Appenzell Innerrhoden',
        url: '/americanexpress/ai',
      };
    case 'ar':
      return {
        amexProvinceEnum: PROVINCE_ENUM.AR,
        label: 'Appenzell Ausserrhoden',
        url: '/americanexpress/ar',
      };
    case 'be':
      return {
        amexProvinceEnum: PROVINCE_ENUM.BE,
        label: 'Bern',
        url: '/americanexpress/be',
      };
    case 'bl':
      return {
        amexProvinceEnum: PROVINCE_ENUM.BL,
        label: 'Basel-Landschaft',
        url: '/americanexpress/bl',
      };
    case 'bs':
      return {
        amexProvinceEnum: PROVINCE_ENUM.BS,
        label: 'Basel-Stadt',
        url: '/americanexpress/bs',
      };
    case 'fr':
      return {
        amexProvinceEnum: PROVINCE_ENUM.FR,
        label: 'Freiburg',
        url: '/americanexpress/fr',
      };
    case 'ge':
      return {
        amexProvinceEnum: PROVINCE_ENUM.GE,
        label: 'Genf',
        url: '/americanexpress/ge',
      };
    case 'gl':
      return {
        amexProvinceEnum: PROVINCE_ENUM.GL,
        label: 'Glarus',
        url: '/americanexpress/gl',
      };
    case 'gr':
      return {
        amexProvinceEnum: PROVINCE_ENUM.GR,
        label: 'Graubünden',
        url: '/americanexpress/gr',
      };
    case 'ju':
      return {
        amexProvinceEnum: PROVINCE_ENUM.JU,
        label: 'Jura',
        url: '/americanexpress/ju',
      };
    case 'lu':
      return {
        amexProvinceEnum: PROVINCE_ENUM.LU,
        label: 'Luzern',
        url: '/americanexpress/lu',
      };
    case 'ne':
      return {
        amexProvinceEnum: PROVINCE_ENUM.NE,
        label: 'Neuenburg',
        url: '/americanexpress/ne',
      };
    case 'nw':
      return {
        amexProvinceEnum: PROVINCE_ENUM.NW,
        label: 'Nidwalden',
        url: '/americanexpress/nw',
      };
    case 'ow':
      return {
        amexProvinceEnum: PROVINCE_ENUM.OW,
        label: 'Obwalden',
        url: '/americanexpress/ow',
      };
    case 'sg':
      return {
        amexProvinceEnum: PROVINCE_ENUM.SG,
        label: 'St. Gallen',
        url: '/americanexpress/sg',
      };
    case 'sh':
      return {
        amexProvinceEnum: PROVINCE_ENUM.SH,
        label: 'Schaffhausen',
        url: '/americanexpress/sh',
      };
    case 'so':
      return {
        amexProvinceEnum: PROVINCE_ENUM.SO,
        label: 'Solothurn',
        url: '/americanexpress/so',
      };
    case 'sz':
      return {
        amexProvinceEnum: PROVINCE_ENUM.SZ,
        label: 'Schwyz',
        url: '/americanexpress/sz',
      };
    case 'tg':
      return {
        amexProvinceEnum: PROVINCE_ENUM.TG,
        label: 'Thurgau',
        url: '/americanexpress/tg',
      };
    case 'ti':
      return {
        amexProvinceEnum: PROVINCE_ENUM.TI,
        label: 'Tessin',
        url: '/americanexpress/ti',
      };
    case 'ur':
      return {
        amexProvinceEnum: PROVINCE_ENUM.UR,
        label: 'Uri',
        url: '/americanexpress/ur',
      };
    case 'vd':
      return {
        amexProvinceEnum: PROVINCE_ENUM.VD,
        label: 'Waadt',
        url: '/americanexpress/vd',
      };
    case 'vs':
      return {
        amexProvinceEnum: PROVINCE_ENUM.VS,
        label: 'Wallis',
        url: '/americanexpress/vs',
      };
    case 'zg':
      return {
        amexProvinceEnum: PROVINCE_ENUM.ZG,
        label: 'Zug',
        url: '/americanexpress/zg',
      };
    case 'zh':
      return {
        amexProvinceEnum: PROVINCE_ENUM.ZH,
        label: 'Zürich',
        url: '/americanexpress/zh',
      };
    case '':
    default:
      return {
        amexProvinceEnum: PROVINCE_ENUM.ALL,
        label: 'Alle',
        url: '/americanexpress',
      };
  }
};
