import React, { memo } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import cloneDeep from 'lodash/cloneDeep';
import urlMod from 'url';
import {
  getDomain,
  getLinkRel,
  getLinkTarget,
  isSpecialProtocol,
} from '../Link/helpers';
import { LinkComponent } from './typings';

const Link: LinkComponent = ({
  link,
  rel,
  children,
  trackingData,
  ...props
}) => {
  const trackingDataString =
    trackingData &&
    Array.isArray(trackingData) &&
    trackingData.length > 0 &&
    JSON.stringify(trackingData);

  const linkProps = cloneDeep(props);
  delete linkProps.nofollow;

  // no linkURL defined - don't create any type of link
  if (!link || !link.path || typeof link.path.startsWith !== 'function') {
    delete linkProps.routed;
    return (
      // @ts-ignore // because spreading all props on the <div> tag is not allowed
      <div
        data-testid="empty-link"
        data-track-info={trackingDataString}
        {...linkProps}
      >
        {children}
      </div>
    );
  }

  const path = link?.path || '';

  const { isSameDomain } = getDomain(path);

  // Render routed link
  if (
    path &&
    path.indexOf('/_/api/') === -1 &&
    (!isSpecialProtocol(path) || (path.startsWith('http') && isSameDomain))
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
        data-track-info={trackingDataString}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        rel={link?.linkRel}
        {...linkProps}
        to={parsedPath}
      >
        {children}
      </ReactRouterLink>
    );
  }

  const target = getLinkTarget(path);
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string | undefined'. */
  const linkRel = getLinkRel(path, rel || link?.linkRel);

  // Render default link
  return (
    // @ts-ignore // because spreading all props on the <a> tag is not allowed
    <a
      data-testid="default-link"
      data-track-info={trackingDataString}
      target={target}
      rel={linkRel}
      {...linkProps}
      href={path}
    >
      {children}
    </a>
  );
};

export default memo(Link);
