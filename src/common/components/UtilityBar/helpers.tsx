import {
  DEVICE_TYPE_ANDROID,
  DEVICE_TYPE_IOS_MOBILE_TABLET,
  getMobileOperatingSystem,
  log,
} from '../../../shared/helpers/utils';

export const SPONSORED_CONTENT_PREFIX = '[Sponsored]';

export const convertUrl = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'url' implicitly has an 'any' type. */
  url,
  shareUrl = '',
  /* @ts-ignore TODO: TS7031 ->  Binding element 'title' implicitly has an 'any' type. */
  title,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'shortTitle' implicitly has an 'any' type. */
  shortTitle,
  lead = '',
  imageUrl = '',
  additionalQueryParam = '',
  /* @ts-ignore TODO: TS7031 ->  Binding element 'socialMediaTitle' implicitly has an 'any' type. */
  socialMediaTitle,
  hasSponsoredContentPrefix = false,
  isHybridApp = false,
}): string => {
  const hasQueryParam =
    shareUrl.indexOf('?') !== -1 || shareUrl.indexOf('%3F') !== -1;
  const paramDelimiter = hasQueryParam && additionalQueryParam ? '&' : '?';

  const routeSearch = __CLIENT__ && global.location?.search.replace('?', '');
  const routeHash = __CLIENT__ && global.location.hash;
  const locationOrigin = isHybridApp
    ? /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      global.locationOrigin.replace('//app.', '//www.')
    : /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      global.locationOrigin;

  if (routeSearch) {
    additionalQueryParam = `${routeSearch}${
      additionalQueryParam && '&'
    }${additionalQueryParam}`;
  }
  let finalUrl =
    (additionalQueryParam &&
      `${shareUrl}${paramDelimiter}${additionalQueryParam}`) ||
    shareUrl;

  if (routeHash) {
    finalUrl = `${finalUrl}#${routeHash}`;
  }
  const socialTitle = socialMediaTitle || title;
  const prefixedSocialMediaTitle = `${SPONSORED_CONTENT_PREFIX} ${socialTitle}`;
  let ogImage = imageUrl || '';
  if (!ogImage && url.indexOf('[field_og_image]') !== -1) {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    ogImage = global.socialMetaValues?.field_heroimage || '';
    log('convertUrl', `setting to: ${ogImage}`, 'green');
  }

  return url
    .replace('[url]', encodeURIComponent(`${locationOrigin}${finalUrl}`))
    .replace('[field_title]', encodeURIComponent(title))
    .replace('[field_lead]', encodeURIComponent(lead))
    .replace('[field_short_title]', encodeURIComponent(shortTitle))
    .replace('[field_og_image]', ogImage)
    .replace(
      '[field_social_media_title]',
      encodeURIComponent(
        (hasSponsoredContentPrefix && prefixedSocialMediaTitle) || socialTitle,
      ),
    );
};

export const openWebShareAPIDialog = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'event' implicitly has an 'any' type. */
  event,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'url' implicitly has an 'any' type. */
  url,
  title = '',
  lead = '',
  isHybridApp = false,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'fallback' implicitly has an 'any' type. */
  fallback,
}) => {
  event.preventDefault();
  const isMobileDevice = getMobileOperatingSystem();

  if (
    !global.navigator?.share ||
    (!isMobileDevice &&
      /* @ts-ignore TODO: TS2367 ->  This condition will always return 'true' since the types '""' and '"Android"' have no overlap. */
      isMobileDevice !== DEVICE_TYPE_ANDROID &&
      /* @ts-ignore TODO: TS2367 ->  This condition will always return 'true' since the types '""' and '"iOS"' have no overlap. */
      isMobileDevice !== DEVICE_TYPE_IOS_MOBILE_TABLET)
  ) {
    fallback();
    return;
  }

  if (isHybridApp) {
    url = url.replace('//app.', '//www.');
  }

  global.navigator
    .share({
      title,
      text: lead,
      url,
    })
    .then(() => {
      return;
    })
    .catch((error) => {
      if (error.name === 'NotAllowedError') {
        fallback();
      }
      return;
    });
};
