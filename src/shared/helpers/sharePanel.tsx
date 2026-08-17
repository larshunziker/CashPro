/**
 * @file    url helpers for share panel component
 * @author  Serkan Ucmak <serkan.ucmak@ringieraxelspringer.ch>
 * @date    2018-12-17
 *
 */

import { NATIVE_ADVERTISING_CONTENT_TYPE } from '../constants/content';

export const AMPERSAND = '%26';
export const QUESTION_MARK = '%3F';
export const SPONSORED_CONTENT_PREFIX = '[Sponsored]';

/**
 * convert a given share-url
 * replace certain parameters with their mapped data values
 *
 * @param {*} url
 * @param {*} shareUrl
 * @param {*} title
 * @param {*} shortTitle
 * @param {*} lead
 * @param {*} additionalQueryParam
 * @param {*} socialMediaTitle
 * @param {*} hasSponsoredContentPrefix
 */
export const doConvertUrl = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'url' implicitly has an 'any' type. */
  url,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'shareUrl' implicitly has an 'any' type. */
  shareUrl,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'title' implicitly has an 'any' type. */
  title,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'shortTitle' implicitly has an 'any' type. */
  shortTitle,
  lead = '',
  additionalQueryParam = '',
  /* @ts-ignore TODO: TS7006 ->  Parameter 'socialMediaTitle' implicitly has an 'any' type. */
  socialMediaTitle,
  hasSponsoredContentPrefix = false,
) => {
  const hasQueryParam =
    shareUrl.indexOf('?') !== -1 || shareUrl.indexOf(QUESTION_MARK) !== -1;
  const paramDelimiter =
    hasQueryParam && additionalQueryParam ? AMPERSAND : QUESTION_MARK;
  const finalUrl =
    (additionalQueryParam &&
      `${shareUrl}${paramDelimiter}${additionalQueryParam}`) ||
    shareUrl;

  const prefixedSocialMediaTitle = `${SPONSORED_CONTENT_PREFIX} ${
    socialMediaTitle || title
  }`;

  return (
    url
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      .replace('[url]', global.locationOrigin + finalUrl)
      .replace('[field_title]', encodeURIComponent(title))
      .replace('[field_lead]', encodeURIComponent(lead))
      .replace(
        '[field_short_title]',
        encodeURIComponent(shortTitle) || encodeURIComponent(title),
      )
      .replace(
        '[field_social_media_title]',
        encodeURIComponent(
          (hasSponsoredContentPrefix && prefixedSocialMediaTitle) ||
            socialMediaTitle ||
            title,
        ),
      )
  );
};

export const isNativeAdvertising = ({ __typename }: { __typename?: string }) =>
  __typename === NATIVE_ADVERTISING_CONTENT_TYPE;
