import { createImgHostUrl } from '../createImgHostUrl';

describe('[Function] createImgHostUrl', () => {
  test.each([
    {
      env: 'local',
      clientUrl: 'http://localhost:3000',
      result: 'https://cdn.dev.ras.dev',
    },
    {
      env: 'stage',
      clientUrl: 'http://localhost:3000',
      result: 'https://cdn.stage.ras.dev',
    },
    {
      env: 'migration',
      clientUrl: 'http://localhost:3000',
      result: 'https://cdn.migration.ras.dev',
    },
    {
      env: 'master',
      clientUrl: 'http://localhost:3000',
      result: 'https://cdn.prod.ras.dev',
    },
    {
      env: 'update',
      clientUrl: 'https://nginx.pr-1111.publication-k8s.develop.ras.dev/',
      result: 'https://cdn.update.ras.dev',
    },
    {
      env: 'gql',
      clientUrl: 'https://nginx.pr-1111.cash-k8s.develop.ras.dev/',
      result: 'https://cdn.gql.ras.dev',
    },
    {
      env: 'stage',
      clientUrl:
        'https://nginx.pr-1111.tele-k8s.develop.ras.dev/foo-bar/baz?foo=bar',
      result: 'https://cdn.stage.ras.dev',
    },
    {
      env: 'develop',
      clientUrl:
        'https://nginx.pr-1111.tele-k8s.develop.ras.dev/foo-bar/baz?foo=bar',
      result: 'https://cdn.dev.ras.dev',
    },
  ])(
    'Should return $result for $env environment when url is $clientUrl',
    ({ env, clientUrl, result }: any) => {
      expect(createImgHostUrl(clientUrl, env)).toStrictEqual(result);
    },
  );

  test.each([
    {
      env: '',
      clientUrl: 'https://www.tele.ch',
      result: '',
    },
    {
      env: 'stage',
      clientUrl: 'htts://stage.cash.ch',
      result: '',
    },
    {
      env: 'develop',
      clientUrl: 'https://develop.beobachter.ch',
      result: '',
    },
    {
      env: 'master',
      clientUrl: 'https://master.pme.ch',
      result: '',
    },
    {
      env: 'stage',
      clientUrl: 'https://preview.stage.publication.ch',
      result: '',
    },
    {
      env: 'prod',
      clientUrl: 'https://preview.gaultimillau.ch',
      result: '',
    },
    {
      env: 'perfomance',
      clientUrl: 'https://performance.handelszeitung.ch/foo-bar/baz?foo=bar',
      result: '',
    },
  ])(
    'Should return empty string for non-(local|PR) urls like ($clientUrl)',
    ({ env, clientUrl, result }: any) => {
      expect(createImgHostUrl(clientUrl, env)).toStrictEqual(result);
    },
  );
});
