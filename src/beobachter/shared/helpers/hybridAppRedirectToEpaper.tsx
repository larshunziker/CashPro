import {
  DEVICE_TYPE_ANDROID,
  DEVICE_TYPE_IOS_MOBILE_TABLET,
  getMobileOperatingSystem,
} from '../../../shared/helpers/utils';
import {
  URL_EPAPER_ANDROID,
  URL_EPAPER_DESKTOP,
  URL_EPAPER_IOS,
} from '../../screens/App/constants';

export function getHybridAppEpaperRedirectUrl(
  os: string = getMobileOperatingSystem(),
) {
  if (os === DEVICE_TYPE_IOS_MOBILE_TABLET) {
    return URL_EPAPER_IOS;
  }
  if (os === DEVICE_TYPE_ANDROID) {
    return URL_EPAPER_ANDROID;
  }
  return URL_EPAPER_DESKTOP;
}

export function hybridAppRedirectToEpaper() {
  const redirectUrl = getHybridAppEpaperRedirectUrl();
  global.location.href = redirectUrl;
}
