import { getListingKey, getSearchParams } from '../helpers';
import { defaultConfig } from '../components/InstrumentGenericData/defaultConfig';

const fullPath =
  'https://cdn.fi-box.service.cash.ch/services/esi-widgets/latest-data';
const hrefBuy =
  'https://ebanking.cash.ch/ebanking/ibf/link?valor=1222171&curr=CHF&tpl=4&lang=de&isin=CH0012221716&page=brokerageBuy';
const hrefSell =
  'https://ebanking.cash.ch/ebanking/ibf/link?valor=1222171&curr=CHF&tpl=4&lang=de&isin=CH0012221716&page=brokerageSell';

const config = JSON.stringify(defaultConfig);

describe('getListingKey', () => {
  test.each`
    path                                                                     | expected
    ${'/1-1-'}                                                               | ${''}
    ${'/1-1-1'}                                                              | ${'1-1-1'}
    ${'/342-234-421'}                                                        | ${'342-234-421'}
    ${'/999999915312-9910014-333'}                                           | ${'999999915312-9910014-333'}
    ${'/231-213-1?a=1&c="'}                                                  | ${'231-213-1'}
    ${'/231-213-1?a=1&c=""'}                                                 | ${'231-213-1'}
    ${'/231-213-1?a=1&url="https://cash.ch"'}                                | ${'231-213-1'}
    ${'/?listingId=231-213-1'}                                               | ${'231-213-1'}
    ${'/?listingKey=231-213-1'}                                              | ${'231-213-1'}
    ${'/?listingKey=231-213-1&mIsin=CH4353&mName=ABB N&subtitle=Untertitel'} | ${'231-213-1'}
    ${'/?key=231-213-1'}                                                     | ${'231-213-1'}
    ${'/?a=1&listingId=231-213-1&c=""'}                                      | ${'231-213-1'}
    ${'/?a=1&key=231-213-1&c=""'}                                            | ${'231-213-1'}
    ${'/?a=1&key=1-5-4&c=""'}                                                | ${'1-5-4'}
    ${`${fullPath}/231-213-1`}                                               | ${'231-213-1'}
    ${`${fullPath}/999999915312-9910014-333`}                                | ${'999999915312-9910014-333'}
    ${`${fullPath}/?listingId=231-213-1`}                                    | ${'231-213-1'}
    ${`${fullPath}/?key=231-213-1`}                                          | ${'231-213-1'}
    ${`${fullPath}/?a=1&key=231-213-1&c=""`}                                 | ${'231-213-1'}
  `('$path.value', ({ path, expected }) => {
    const widgetParagraph = {
      link: {
        path,
      },
    };

    expect(getListingKey(widgetParagraph)).toBe(expected);
  });
});

describe('getSearchParams', () => {
  test.each`
    path                                                                                | expected
    ${'/231-213-1'}                                                                     | ${{}}
    ${'/?listingKey=231-213-1'}                                                         | ${{ listingKey: '231-213-1' }}
    ${'/?listingKey="231-213-1"'}                                                       | ${{ listingKey: '231-213-1' }}
    ${'/?a=1&listingId=231-213-1&c=""'}                                                 | ${{ a: '1', listingId: '231-213-1', c: '""' }}
    ${'/?a=1&listingId=231-213-1&c="'}                                                  | ${{}}
    ${'/?listingKey=231-213-1&mIsin=CH4353&mName=ABB N&subtitle=Untertitel'}            | ${{ listingKey: '231-213-1', mIsin: 'CH4353', mName: 'ABB N', subtitle: 'Untertitel' }}
    ${'/?valor=1222171&scGrouped=EQU'}                                                  | ${{ valor: '1222171', scGrouped: 'EQU' }}
    ${`/?tradeType=VAL_BC_CURR&hrefBuy="${hrefBuy}"`}                                   | ${{ tradeType: 'VAL_BC_CURR', hrefBuy: hrefBuy }}
    ${`/?tradeType=VAL_BC_CURR&hrefBuy="${hrefBuy}"&c=""`}                              | ${{ tradeType: 'VAL_BC_CURR', hrefBuy: hrefBuy, c: '""' }}
    ${`/?a=1&hrefBuy="${hrefBuy}"&hrefSell="${hrefSell}"`}                              | ${{ a: '1', hrefBuy: hrefBuy, hrefSell: hrefSell }}
    ${`/?widgetTitle=Stammdaten&config=${config}`}                                      | ${{ widgetTitle: 'Stammdaten', config: config }}
    ${`/?widgetTitle=Stammdaten&config="${config}"`}                                    | ${{ widgetTitle: 'Stammdaten', config: `"${config}"` }}
    ${`/?widgetTitle=Stammdaten&config=${config}&otherParam=false`}                     | ${{ widgetTitle: 'Stammdaten', config: config, otherParam: 'false' }}
    ${`${fullPath}/?a=1&listingId=231-213-1&c=""`}                                      | ${{ a: '1', listingId: '231-213-1', c: '""' }}
    ${`${fullPath}/?listingKey="231-213-1"`}                                            | ${{ listingKey: '231-213-1' }}
    ${`${fullPath}/?a=1&listingId=231-213-1&c=""`}                                      | ${{ a: '1', listingId: '231-213-1', c: '""' }}
    ${`${fullPath}/?valor=1222171&scGrouped=EQU`}                                       | ${{ valor: '1222171', scGrouped: 'EQU' }}
    ${`${fullPath}/?tradeType=VAL_BC_CURR&hrefBuy="${hrefBuy}"`}                        | ${{ tradeType: 'VAL_BC_CURR', hrefBuy: hrefBuy }}
    ${`${fullPath}/?listingKey=231-213-1&mIsin=CH4353&mName=ABB N&subtitle=Untertitel`} | ${{ listingKey: '231-213-1', mIsin: 'CH4353', mName: 'ABB N', subtitle: 'Untertitel' }}
    ${`${fullPath}/?a=1&hrefBuy="${hrefBuy}"&hrefSell="${hrefSell}"`}                   | ${{ a: '1', hrefBuy: hrefBuy, hrefSell: hrefSell }}
  `('$path.value', ({ path, expected }) => {
    const widgetParagraph = {
      link: {
        path,
      },
    };

    expect(getSearchParams(widgetParagraph)).toStrictEqual(expected);
  });
});
