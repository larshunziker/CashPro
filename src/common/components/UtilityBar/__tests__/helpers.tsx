import { convertUrl } from '../helpers';

let mockData = {
  title: 'mockedTitle',
  shareUrl: '/',
  shortTitle: 'mockedShortTitle',
  lead: 'mocked lead text',
  additionalQueryParam:
    'mocked_utm_source=xing&mocked_utm_medium=social&mocked_utm_campaign=share-button',
  socialMediaTitle: 'mockedSocialMediaTitle',
  hasSponsoredContentPrefix: false,
};

beforeEach(() => {
  mockData = {
    title: 'mockedTitle',
    shareUrl: '/',
    shortTitle: 'mockedShortTitle',
    lead: 'mocked lead text',
    additionalQueryParam:
      'mocked_utm_source=xing&mocked_utm_medium=social&mocked_utm_campaign=share-button',
    socialMediaTitle: 'mockedSocialMediaTitle',
    hasSponsoredContentPrefix: false,
  };
});

describe('[Common] UtilityBar - helpers', () => {
  it('Should correctly replace field_title url and field_social_media_title ', () => {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.locationOrigin = 'https://beobachter.ch/home';
    const testUrl =
      'https://example.com?text=[field_title]&url=[url]&param2=[field_social_media_title]';

    expect(convertUrl({ ...mockData, url: testUrl })).toBe(
      'https://example.com?text=mockedTitle&url=https%3A%2F%2Fbeobachter.ch%2Fhome%2F%3Fmocked_utm_source%3Dxing%26mocked_utm_medium%3Dsocial%26mocked_utm_campaign%3Dshare-button&param2=mockedSocialMediaTitle',
    );
  });

  it('Should correctly replace field_title url and field_social_media_title if url has a hash', () => {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.locationOrigin = 'https://beobachter.ch/home#mysection';
    const testUrl =
      'https://example.com?text=[field_title]&url=[url]&param2=[field_social_media_title]';

    expect(convertUrl({ ...mockData, url: testUrl })).toBe(
      'https://example.com?text=mockedTitle&url=https%3A%2F%2Fbeobachter.ch%2Fhome%23mysection%2F%3Fmocked_utm_source%3Dxing%26mocked_utm_medium%3Dsocial%26mocked_utm_campaign%3Dshare-button&param2=mockedSocialMediaTitle',
    );
  });

  it('Should correctly replace field_title url and field_social_media_title with one existing query param', () => {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.locationOrigin = 'https://beobachter.ch/home?page=2';
    const testUrl =
      'https://example.com?text=[field_title]&url=[url]&param2=[field_social_media_title]';

    expect(convertUrl({ ...mockData, url: testUrl })).toBe(
      'https://example.com?text=mockedTitle&url=https%3A%2F%2Fbeobachter.ch%2Fhome%3Fpage%3D2%2F%3Fmocked_utm_source%3Dxing%26mocked_utm_medium%3Dsocial%26mocked_utm_campaign%3Dshare-button&param2=mockedSocialMediaTitle',
    );
  });

  it('Should correctly replace field_title url and field_social_media_title with two existing query params', () => {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.locationOrigin = 'https://beobachter.ch/home?page=2&sort=asc';
    const testUrl =
      'https://example.com?text=[field_title]&url=[url]&param2=[field_social_media_title]';

    expect(convertUrl({ ...mockData, url: testUrl })).toBe(
      'https://example.com?text=mockedTitle&url=https%3A%2F%2Fbeobachter.ch%2Fhome%3Fpage%3D2%26sort%3Dasc%2F%3Fmocked_utm_source%3Dxing%26mocked_utm_medium%3Dsocial%26mocked_utm_campaign%3Dshare-button&param2=mockedSocialMediaTitle',
    );
  });

  it('Should correctly replace field_lead url and field_social_media_title', () => {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.locationOrigin = 'https://beobachter.ch/home?page=2&sort=asc';
    const testUrl =
      'https://example.com?text=[field_lead]&url=[url]&param2=[field_social_media_title]';

    expect(convertUrl({ ...mockData, url: testUrl })).toBe(
      'https://example.com?text=mocked%20lead%20text&url=https%3A%2F%2Fbeobachter.ch%2Fhome%3Fpage%3D2%26sort%3Dasc%2F%3Fmocked_utm_source%3Dxing%26mocked_utm_medium%3Dsocial%26mocked_utm_campaign%3Dshare-button&param2=mockedSocialMediaTitle',
    );
  });

  it('Should correctly replace field_lead url and field_social_media_title with no additionalQueryParams', () => {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.locationOrigin = 'https://beobachter.ch/home?page=2&sort=asc';
    const testUrl =
      'https://example.com?text=[field_lead]&url=[url]&param2=[field_social_media_title]';
    mockData.additionalQueryParam = '';

    expect(convertUrl({ ...mockData, url: testUrl })).toBe(
      'https://example.com?text=mocked%20lead%20text&url=https%3A%2F%2Fbeobachter.ch%2Fhome%3Fpage%3D2%26sort%3Dasc%2F&param2=mockedSocialMediaTitle',
    );
  });

  it('Should correctly replace field_lead url and field_social_media_title with no additionalQueryParams', () => {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.locationOrigin = 'https://beobachter.ch/home?page=2&sort=asc';
    const testUrl =
      'https://example.com?text=[field_lead]&url=[url]&param2=[field_social_media_title]';
    mockData.additionalQueryParam = '';

    expect(convertUrl({ ...mockData, url: testUrl })).toBe(
      'https://example.com?text=mocked%20lead%20text&url=https%3A%2F%2Fbeobachter.ch%2Fhome%3Fpage%3D2%26sort%3Dasc%2F&param2=mockedSocialMediaTitle',
    );
  });

  it('Should correctly replace field_title url and field_social_media_title with one existing query param and sponsored content prefix', () => {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.locationOrigin = 'https://beobachter.ch/home?page=2';
    const testUrl =
      'https://example.com?text=[field_title]&url=[url]&param2=[field_social_media_title]';

    mockData.hasSponsoredContentPrefix = true;

    expect(convertUrl({ ...mockData, url: testUrl })).toBe(
      'https://example.com?text=mockedTitle&url=https%3A%2F%2Fbeobachter.ch%2Fhome%3Fpage%3D2%2F%3Fmocked_utm_source%3Dxing%26mocked_utm_medium%3Dsocial%26mocked_utm_campaign%3Dshare-button&param2=%5BSponsored%5D%20mockedSocialMediaTitle',
    );
  });

  it('Should correctly replace app in url with www when in hybrid app', () => {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.locationOrigin = 'https://app.handelszeitung.ch/home';
    const testUrl =
      'https://example.com?text=[field_title]&url=[url]&param2=[field_social_media_title]';

    expect(convertUrl({ ...mockData, url: testUrl, isHybridApp: true })).toBe(
      'https://example.com?text=mockedTitle&url=https%3A%2F%2Fwww.handelszeitung.ch%2Fhome%2F%3Fmocked_utm_source%3Dxing%26mocked_utm_medium%3Dsocial%26mocked_utm_campaign%3Dshare-button&param2=mockedSocialMediaTitle',
    );
  });
});
