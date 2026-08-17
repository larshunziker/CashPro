import {
  ADMEIRA_PLATFORM_DESKTOP,
  ADMEIRA_PLATFORM_MOBILE,
} from '../../constants/ads';
import * as deviceDetector from '../deviceDetector';
import {
  enrichArticleBodyWithADs,
  enrichOverviewBodyWithADs,
  getAdmeiraNativeWebapp,
} from '../ads';

const pageBody = [
  {
    __typename: 'EntityQueueParagraph',
    id: '1',
    edges: null,
  },
  {
    __typename: 'EntityQueueParagraph',
    id: '2',
    edges: null,
  },
  {
    __typename: 'TextParagraph',
    id: '3',
    text: '',
    characterCount: 500,
  },
  {
    __typename: 'TextParagraph',
    id: '4',
    text: '',
    characterCount: 500,
  },
  {
    __typename: 'EntityQueueParagraph',
    id: '5',
  },
  {
    __typename: 'TextParagraph',
    id: '6',
    text: '',
    characterCount: 500,
  },
  {
    __typename: 'TextParagraph',
    id: '7',
    text: '',
    characterCount: 500,
  },
  {
    __typename: 'TextParagraph',
    id: '8',
    text: '',
    characterCount: 500,
  },
  {
    __typename: 'TextParagraph',
    id: '9',
    text: '',
    characterCount: 500,
  },
  {
    __typename: 'TextParagraph',
    id: '10',
    text: '',
    characterCount: 500,
  },
  {
    __typename: 'TextParagraph',
    id: '11',
    text: '',
    characterCount: 500,
  },
];

describe('[helper] ads', () => {
  it('should enrich overview with ads', () => {
    const enrichedPageBody = enrichOverviewBodyWithADs({ pageBody });
    expect(enrichedPageBody).toMatchSnapshot();
  });

  it('should not enrich overview with ads', () => {
    const pageBody = null;
    const enrichedPageBody = enrichOverviewBodyWithADs({ pageBody });
    expect(enrichedPageBody).toMatchSnapshot();
  });

  it('should enrich overview with ads in eq', () => {
    const pageBody = null;
    const enrichedPageBody = enrichOverviewBodyWithADs({
      pageBody,
      hasEQsWithMMR: true,
    });
    expect(enrichedPageBody).toMatchSnapshot();
  });

  it('should enrich article with ads', () => {
    const enrichedPageBody = enrichArticleBodyWithADs({ pageBody });
    expect(enrichedPageBody).toMatchSnapshot();
  });

  it('should not enrich article with ads', () => {
    const pageBody = null;
    const enrichedPageBody = enrichArticleBodyWithADs({ pageBody });
    expect(enrichedPageBody).toMatchSnapshot();
  });
});

describe('[Function] getAdmeiraNativeWebapp', () => {
  let isIOSSpy: jest.SpyInstance;

  beforeEach(() => {
    isIOSSpy = jest.spyOn(deviceDetector, 'isIOS').mockReturnValue(false);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('when platform is Desktop', () => {
    it('returns undefined when not in a hybrid app', () => {
      expect(
        getAdmeiraNativeWebapp(ADMEIRA_PLATFORM_DESKTOP, false),
      ).toBeUndefined();
      expect(isIOSSpy).not.toHaveBeenCalled();
    });

    it('returns undefined even inside a hybrid app (key must be omitted)', () => {
      isIOSSpy.mockReturnValue(true);
      expect(
        getAdmeiraNativeWebapp(ADMEIRA_PLATFORM_DESKTOP, true),
      ).toBeUndefined();
      expect(isIOSSpy).not.toHaveBeenCalled();
    });

    it('returns undefined for any unknown platform value', () => {
      expect(getAdmeiraNativeWebapp('Tablet', true)).toBeUndefined();
      expect(getAdmeiraNativeWebapp('', false)).toBeUndefined();
    });
  });

  describe('when platform is MobileWeb', () => {
    it('returns "mobileweb" when not running in a hybrid app', () => {
      expect(getAdmeiraNativeWebapp(ADMEIRA_PLATFORM_MOBILE, false)).toBe(
        'mobileweb',
      );
      expect(isIOSSpy).not.toHaveBeenCalled();
    });

    it('returns "ios" for hybrid app on an iOS device', () => {
      isIOSSpy.mockReturnValue(true);
      expect(getAdmeiraNativeWebapp(ADMEIRA_PLATFORM_MOBILE, true)).toBe('ios');
      expect(isIOSSpy).toHaveBeenCalledTimes(1);
    });

    it('returns "android" for hybrid app on a non-iOS device', () => {
      isIOSSpy.mockReturnValue(false);
      expect(getAdmeiraNativeWebapp(ADMEIRA_PLATFORM_MOBILE, true)).toBe(
        'android',
      );
      expect(isIOSSpy).toHaveBeenCalledTimes(1);
    });
  });
});
