import { isHostProtected } from '../isHostProtected';

describe('[Function] isHostProtected', () => {
  const cmsReferrer = (referrer?: 'stage' | 'prod' | 'cms' | 'other') => () => {
    const referrers = {
      stage: 'https://cms.stage.ringiermedienschweiz.ch',
      prod: 'https://cms.ringiermedienschweiz.ch',
      cms: 'https://cms.dev.ringiermedienschweiz.ch',
      other: 'https://hacked-path.ch/path/cms.ringiermedienschweiz.ch',
    };
    /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
    return referrers[referrer];
  };

  // @ts-ignore
  __PRODUCTION__ = true;
  // @ts-ignore
  __APP_NAME__ = 'schweizer-illustrierte';

  test.each([
    {
      req: {
        headers: {
          host: 'schweizer-illustrierte.ch',
        },
        get: cmsReferrer(),
      },
      result: false,
    },
    {
      req: {
        headers: {
          host: 'localhost:3000',
        },
        get: cmsReferrer(),
      },
      result: false,
    },
    {
      req: {
        headers: {
          host: 'www.cash.ch',
        },
        get: cmsReferrer('stage'),
      },
      result: false,
    },
    {
      req: {
        headers: {
          host: 'www.beobachter.ch',
        },
        get: cmsReferrer('prod'),
      },
      result: false,
    },
  ])(
    'Should return False when current env is production and host $req.headers.host is either in localhost, allowed hosts or referrer',
    ({ req, result }: any) => {
      expect(isHostProtected(req)).toStrictEqual(result);
    },
  );

  test.each([
    {
      req: {
        headers: {
          host: 'stage.pme.ch',
        },
        get: cmsReferrer('other'),
      },
      result: true,
    },
    {
      req: {
        headers: {
          host: 'nginx.pr-xxx.pme-k8s.develop.ras.dev',
        },
        get: cmsReferrer('other'),
      },
      result: true,
    },
  ])(
    'Should return True when current env is production and host $req.headers.host is not in localhost, allowed hosts or referrer',
    ({ req, result }: any) => {
      expect(isHostProtected(req)).toStrictEqual(result);
    },
  );

  it('Should return False when refferer is cms', () => {
    const req = {
      headers: {
        host: 'stage.beobachter.ch',
      },
      get: cmsReferrer('cms'),
    } as any;

    expect(isHostProtected(req)).toStrictEqual(false);
  });

  it('Should return False when current env is not production', () => {
    const req = {
      headers: {
        host: 'www.pme.ch',
      },
      get: cmsReferrer('other'),
    } as any;

    // @ts-ignore
    __PRODUCTION__ = false;
    // @ts-ignore
    __APP_NAME__ = 'schweizer-illustrierte';

    expect(isHostProtected(req)).toStrictEqual(false);
  });
});
