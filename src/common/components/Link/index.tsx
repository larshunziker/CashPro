import React, { memo } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import urlMod from 'url';
import { isFileLink } from '../../../shared/helpers/utils';
import {
  getDomain,
  getLinkRel,
  getLinkTarget,
  isSpecialProtocol,
} from './helpers';
import { useSrollToLinkElement } from '../../../shared/hooks/useScrollToLinkElement';
import { LinkProps } from './typings';

type LinkPropsInner = LinkProps;

const Link = ({
  path,
  rel,
  children,
  trackingData,
  className,
  ariaLabel,
  onClick,
  label,
  title,
  target = undefined,
}: LinkPropsInner) => {
  const trackingDataString = JSON.stringify(trackingData);
  const { pushToLinkStack } = useSrollToLinkElement();

  if ((!path || typeof path.startsWith !== 'function') && !onClick) {
    return (
      <div
        className={className}
        data-testid="empty-link"
        data-track-info={trackingDataString}
      >
        {children || label}
      </div>
    );
  }

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const { isSameDomain } = getDomain(path);

  const customClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isSameDomain || path?.startsWith('/')) {
      pushToLinkStack(event.target as HTMLElement);
    }
    if (onClick) {
      return onClick(event);
    }
    return null;
  };

  // Render routed link
  if (
    path &&
    path.indexOf('/_/api/') === -1 &&
    (!isSpecialProtocol(path) ||
      (path.startsWith('http') && isSameDomain && !isFileLink(path)))
  ) {
    let parsedPath = path;

    // make relative path if we are on same host
    if (path.startsWith('http')) {
      const parsedUri = urlMod.parse(path);
      parsedPath = `${parsedUri.path}${parsedUri?.hash || ''}`;
    }
    return (
      <ReactRouterLink
        data-testid="routed-link"
        target={target}
        data-track-info={trackingDataString}
        rel={rel}
        to={parsedPath}
        className={className}
        aria-label={ariaLabel}
        title={title}
        onClick={customClick}
      >
        {children || label}
      </ReactRouterLink>
    );
  }

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const linkRel = getLinkRel(path, rel);
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const targetFromPath = getLinkTarget(path);

  return (
    <a
      data-testid="default-link"
      data-track-info={trackingDataString}
      target={target || targetFromPath}
      rel={linkRel}
      href={path}
      className={className}
      aria-label={ariaLabel}
      onClick={customClick}
      title={title}
    >
      {children || label}
    </a>
  );
};

export default memo<LinkProps>(Link);
