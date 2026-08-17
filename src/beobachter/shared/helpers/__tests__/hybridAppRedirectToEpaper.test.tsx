import * as utils from '../../../../shared/helpers/utils';
import {
  getHybridAppEpaperRedirectUrl,
  hybridAppRedirectToEpaper,
} from '../hybridAppRedirectToEpaper';
import {
  URL_EPAPER_ANDROID,
  URL_EPAPER_DESKTOP,
  URL_EPAPER_IOS,
} from '../../../screens/App/constants';

describe('getHybridAppEpaperRedirectUrl', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns iOS app URL for iOS devices', () => {
    expect(
      getHybridAppEpaperRedirectUrl(utils.DEVICE_TYPE_IOS_MOBILE_TABLET),
    ).toBe(URL_EPAPER_IOS);
  });

  it('returns Android app URL for Android devices', () => {
    expect(getHybridAppEpaperRedirectUrl(utils.DEVICE_TYPE_ANDROID)).toBe(
      URL_EPAPER_ANDROID,
    );
  });

  it('returns desktop URL as fallback for unknown devices', () => {
    expect(getHybridAppEpaperRedirectUrl('Unknown OS')).toBe(
      URL_EPAPER_DESKTOP,
    );
  });

  it('uses getMobileOperatingSystem when called without arguments', () => {
    const getMobileOperatingSystemMock = jest.spyOn(
      utils,
      'getMobileOperatingSystem',
    );

    getMobileOperatingSystemMock.mockReturnValue(utils.DEVICE_TYPE_ANDROID);

    expect(getHybridAppEpaperRedirectUrl()).toBe(URL_EPAPER_ANDROID);
    expect(getMobileOperatingSystemMock).toHaveBeenCalledTimes(1);
  });
});

describe('hybridAppRedirectToEpaper', () => {
  const originalLocation = global.location;

  beforeEach(() => {
    Object.defineProperty(global, 'location', {
      configurable: true,
      value: { href: '' },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    Object.defineProperty(global, 'location', {
      configurable: true,
      value: originalLocation,
    });
  });

  it('redirects to the Android URL when OS is Android', () => {
    jest
      .spyOn(utils, 'getMobileOperatingSystem')
      .mockReturnValue(utils.DEVICE_TYPE_ANDROID);

    hybridAppRedirectToEpaper();

    expect(global.location.href).toBe(URL_EPAPER_ANDROID);
  });

  it('redirects to the desktop URL for unknown OS', () => {
    jest.spyOn(utils, 'getMobileOperatingSystem').mockReturnValue('');

    hybridAppRedirectToEpaper();

    expect(global.location.href).toBe(URL_EPAPER_DESKTOP);
  });
});
