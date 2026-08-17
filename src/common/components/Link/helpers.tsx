/**
 * @file   link component
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @author Kornel Bobula <kornel.bobula@dreamlab.pl>
 * @date   2019-09-04
 */

import { isFileLink } from '../../../shared/helpers/utils';
import config from './config.json';

export const checkBlackList = (path: string): boolean =>
  config.nofollow.some((tld: string): boolean => path.indexOf(tld) !== -1);

export const checkWhiteList = (path: string): boolean =>
  config.whiteList.some(
    (whitelistedDomain: string): boolean =>
      path.indexOf(whitelistedDomain) !== -1,
  );

export const removeProtocolAndSubdomain = (path: string): string =>
  path
    ?.replace(
      /^(?:https?:\/\/)?(?:(www|app|stage|develop|preview|master)\.((stage|develop)\.)?)?/i,
      '',
    )
    .split('/')[0] || path;

export const getDomain = (path: string) => {
  const domain = path && removeProtocolAndSubdomain(path);
  const isSameDomain =
    domain &&
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    domain.startsWith(removeProtocolAndSubdomain(global.locationOrigin));

  return {
    domain,
    isSameDomain,
  };
};

export const isSpecialProtocol = (path: string) =>
  path &&
  typeof path === 'string' &&
  (path.startsWith('http') ||
    path.startsWith('tel:') ||
    path.startsWith('sms:') ||
    path.startsWith('geo:') ||
    path.startsWith('mms:') ||
    path.startsWith('whatsapp:') ||
    path.startsWith('mailto:') ||
    path.startsWith('javascript:'));

export const getLinkTarget = (path: string) => {
  let target: string;
  /* @ts-ignore TODO: TS2454 ->  Variable 'target' is used before being assigned. */
  if (!path) return target;

  const { isSameDomain } = getDomain(path);

  if (!isSameDomain || isFileLink(path)) {
    target = '_blank';
  } else if (isSpecialProtocol(path)) {
    target = '_self';
  }
  /* @ts-ignore TODO: TS2454 ->  Variable 'target' is used before being assigned. */
  return target;
};

export const getLinkRel = (path: string, existingRel?: string) => {
  let rel = existingRel;
  if (!path) {
    return rel;
  }

  const { isSameDomain } = getDomain(path);
  if (!isSameDomain && existingRel?.startsWith('sponsored')) {
    rel = 'noopener sponsored';
  } else if (!isSameDomain) {
    rel = 'noopener nofollow';
  }
  return rel;
};
