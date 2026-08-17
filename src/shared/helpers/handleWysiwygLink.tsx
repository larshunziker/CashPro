import { NavigateFunction } from 'react-router-dom';
import urlMod from 'url';
import { getDomain } from '../../common/components/Link/helpers';
import { pushToLinkStack } from '../hooks/useScrollToLinkElement';
import { tealiumTrackEvent } from './tealium';
import { isFileLink, isStandalonePage } from './utils';

const redirectUrl = (
  link: string,
  navigate: NavigateFunction,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'isExternalUrl' implicitly has an 'any' type. */
  isExternalUrl,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'anchorElement' implicitly has an 'any' type. */
  anchorElement,
) => {
  if (isExternalUrl) {
    window.open(link, '_blank');
  } else {
    const parsedUri = urlMod.parse(link);
    const hash = parsedUri.hash ?? '';

    pushToLinkStack(anchorElement);

    return navigate(`${parsedUri.path}${hash}`);
  }
};

const urlRegex = new RegExp(/^([a-z]+\:\/{2})?([\w-]+\.[\w-]+\.\w+)$/);

const handleWysiwygLink = (
  urlEvent: MouseEvent | string,
  navigate: NavigateFunction,
) => {
  const isUrl = typeof urlEvent === 'string';
  let anchorElement =
    (!isUrl && (urlEvent.target as HTMLAnchorElement)) || null;

  if (anchorElement?.nodeName !== 'A') {
    /* @ts-ignore TODO: TS2322 ->  Type 'HTMLAnchorElement | null | undefined' is not assignable to type 'HTMLAnchorElement | null'. */
    anchorElement = anchorElement?.closest?.('a');
  }

  if (isUrl) {
    if (urlEvent.startsWith('/')) {
      redirectUrl(urlEvent, navigate, false, anchorElement);
      return;
    }
    const { isSameDomain } = getDomain(urlEvent);
    const isNotSameHost = !isSameDomain;

    redirectUrl(urlEvent, navigate, isNotSameHost, anchorElement);

    return;
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'url' implicitly has an 'any' type. */
  const isSubdomain = (url) => {
    if (url.indexOf('://www.') > -1 || url.startsWith('www.')) {
      return false;
    }

    return !!url.match(urlRegex); // make sure it returns boolean
  };

  const isSameHost = () => {
    /* @ts-ignore TODO: TS2322 ->  Type 'boolean | null' is not assignable to type 'boolean'. */
    const isPublication: boolean =
      anchorElement &&
      anchorElement.host.includes(`.${__APP_NAME__}`) &&
      anchorElement.host.endsWith('.ch');

    if (
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      anchorElement.getAttribute &&
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      anchorElement.getAttribute('href')?.startsWith('/')
    ) {
      return true;
    }

    // if we are on same host but with subdomain then we open it in a new tab
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    if (isPublication && isSubdomain(anchorElement.host)) {
      return false;
    }
    return isPublication;
  };

  // The following Href declarations and the if-condition have been implemented while fixing a Bug on BEO & HZ (BEO-607).
  // Explanation: Once an author saves an article in the backend every element with an <a>-tag, an onclick attribute will be added to it, so we can handle redirects natively (via react router)
  // but this onclick event overwrites the onclick event that has been added to these elements via smooth scroll factory
  // the following condition makes sure that we do not handle onclick events with this helper if they are local href links.
  /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
  const linkElementHref: string[] = anchorElement.href.split('#');
  const globalLocationHref: string[] = global.location.href.split('#');

  if (
    (linkElementHref[0] === globalLocationHref[0] &&
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      anchorElement.href.indexOf('#')) ||
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    anchorElement.href.startsWith('tel:')
  ) {
    return;
  }

  urlEvent.preventDefault();

  /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
  const lastPathnamePart = anchorElement.pathname.split('/').pop();
  const isLink = isFileLink(lastPathnamePart);

  if (isLink) {
    tealiumTrackEvent({
      type: 'link',
      payload: {
        event_name: 'download',
        event_category: 'download_link',
        event_action: 'click',
        event_label: lastPathnamePart,
      },
    });
    // count meter also on documents download
    window.tp?.experience?.execute();
  }

  const isExternalUrl =
    (anchorElement?.target === '_blank' && !isSameHost()) ||
    !isSameHost() ||
    isLink ||
    //  The CMS changes _blank to _self if it is the same domain but the data-attribute stays.
    anchorElement?.dataset?.forceblank === 'true' ||
    isStandalonePage(anchorElement?.pathname);

  /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
  redirectUrl(anchorElement.href, navigate, isExternalUrl, anchorElement);
};

export default handleWysiwygLink;
