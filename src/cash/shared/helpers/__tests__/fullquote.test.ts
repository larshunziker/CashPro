import {
  getFullquotePath,
  getResolvedLongFullquotePath,
  isStockFullquoteShorthandPath,
  isStockFullquoteShorthandValorName,
} from '../fullquote';

describe('[HELPER] fullquote', () => {
  describe('isStockFullquoteShorthandValorName', () => {
    it('accepts stock slugs ending with a numeric valor', () => {
      expect(isStockFullquoteShorthandValorName('abb-n-1222171')).toBe(true);
    });

    it('rejects CMS-like stock paths and non-numeric suffixes', () => {
      expect(isStockFullquoteShorthandValorName('wikifolio')).toBe(false);
      expect(isStockFullquoteShorthandValorName('abb-n')).toBe(false);
    });
  });

  describe('isStockFullquoteShorthandPath', () => {
    it('accepts two-segment stock shorthand paths', () => {
      expect(isStockFullquoteShorthandPath('/aktien/abb-n-1222171')).toBe(true);
    });

    it('rejects long fullquote paths and CMS stock paths', () => {
      expect(
        isStockFullquoteShorthandPath('/aktien/abb-n-1222171/swx/chf'),
      ).toBe(false);
      expect(isStockFullquoteShorthandPath('/aktien/wikifolio')).toBe(false);
    });
  });

  it('builds fullquote paths without empty segments', () => {
    expect(
      getFullquotePath({
        pageType: 'aktien',
        valorName: 'abb-n-1222171',
      }),
    ).toBe('/aktien/abb-n-1222171');
  });

  it('resolves missing market and currency from fullquote data', () => {
    const fullquotePage = { mMarket: 'SWX', mCur: 'CHF' };

    expect(
      getResolvedLongFullquotePath({
        pageType: 'aktien',
        valorName: 'abb-n-1222171',
        fullquotePage,
      }),
    ).toBe('/aktien/abb-n-1222171/swx/chf');
  });
});
