import React, { KeyboardEvent, MouseEvent, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import SVGIcon from '../SVGIcon';
import {
  FULLSCREEN_HASH,
  FULLSCREEN_HASH_IMAGE_CLICK,
} from '../../../../../shared/constants/fullscreen';
import { SVG_ICONS_TYPE_FULLSCREEN } from '../../../../../shared/constants/svgIcons';
import styles from './styles.legacy.css';
import type { ImgProps } from './typings';

/* @ts-ignore TODO: TS7006 ->  Parameter 'navigate' implicitly has an 'any' type. */
const openFullscreenGallery = (event: MouseEvent | KeyboardEvent, navigate) => {
  if (
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.isFullscreenGallery ||
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"key"' can't be used to index type 'MouseEvent<Element */
    (event.type === 'keydown' && event['key'] !== 'Enter')
  ) {
    return;
  }
  event.preventDefault();
  const target = event.currentTarget;
  const hash = (target && target.getAttribute('data-href')) || '';
  navigate(global.location.pathname + global.location.search + hash);
};

const FullscreenButton = ({ imageId, origin }: ImgProps): ReactElement => {
  const navigate = useNavigate();
  if (!imageId) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }
  let trackingData: Array<TrackingData>;
  if (origin) {
    trackingData = [
      {
        type: 'fullscreen-button',
        value: origin,
      },
    ];
  }

  return (
    <span
      data-track-info={
        /* @ts-ignore TODO: TS2454 ->  Variable 'trackingData' is used before being assigned. */
        trackingData &&
        Array.isArray(trackingData) &&
        trackingData.length > 0 &&
        JSON.stringify(trackingData)
      }
      onClick={(event) => openFullscreenGallery(event, navigate)}
      onKeyDown={(event) => openFullscreenGallery(event, navigate)}
      data-testid="fullscreen-button-wrapper"
      title="Vollbildmodus öffnen"
      className={classNames('fullscreen-button', styles.Icon)}
      data-href={`#${FULLSCREEN_HASH_IMAGE_CLICK + FULLSCREEN_HASH}${imageId}`}
      role="button"
      tabIndex={0}
    >
      <SVGIcon type={SVG_ICONS_TYPE_FULLSCREEN} />
    </span>
  );
};

export default FullscreenButton;
