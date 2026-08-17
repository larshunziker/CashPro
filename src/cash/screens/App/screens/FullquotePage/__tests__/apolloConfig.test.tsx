import { fullquotePageApolloConfig } from '../apolloConfig';

describe('[CONFIG] fullquotePageApolloConfig', () => {
  it('passes shorthand stock paths to getFullquotePage', () => {
    const options = fullquotePageApolloConfig.options({
      location: { pathname: '/aktien/abb-n-1222171' },
      params: { valorName: 'abb-n-1222171' },
      props: { isHybridApp: false } as any,
    });

    expect(options.variables).toEqual({ path: 'aktien/abb-n-1222171' });
  });

  it('keeps long stock paths unchanged', () => {
    const options = fullquotePageApolloConfig.options({
      location: { pathname: '/aktien/abb-n-1222171/swx/chf' },
      params: {
        valorName: 'abb-n-1222171',
        market: 'swx',
        currency: 'chf',
      },
      props: { isHybridApp: false } as any,
    });

    expect(options.variables).toEqual({
      path: 'aktien/abb-n-1222171/swx/chf',
    });
  });
});
