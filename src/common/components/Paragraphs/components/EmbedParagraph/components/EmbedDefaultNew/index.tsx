import React, { LegacyRef, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { MULTI_COLUMNS_PARAGRAPH } from '../../../../../../../shared/constants/paragraphs';
import { EMBED_WIDTH_FULL } from '../../constants';
import styles from './styles.legacy.css';
import { EmbedParagraphItemProps } from '../../typings';

export type EmbedDefaultPropsInner = EmbedParagraphItemProps;

/* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
const updateHeight = (event) => {
  // to identify the right iframe to change the height we need to get the src from the iframe postMessage
  let iframe: HTMLIFrameElement =
    (event?.data?.src &&
      (document.querySelector(
        `iframe[src^="${event.data.src}"]`,
      ) as HTMLIFrameElement)) ||
    null;

  /* LEGACY start */
  // The current scripts which are deployed on cash clients in production are using the frame attribute.
  // We requested the clients to update their scripts by adding the src attribute instead of frame.
  // In the frame we get the hash from the iframe url (for example https://cash.ch/embed/123#hash)
  // then we search for the iframe with the src attribute containing that hash
  if (!iframe && event?.data?.frame) {
    iframe =
      (document.querySelector(
        `iframe[src*="${event.data.frame}"]`,
      ) as HTMLIFrameElement) || null;
  }
  /* LEGACY end */

  if (iframe && event?.data?.h) {
    iframe.height = event.data.h;
  }
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'element' implicitly has an 'any' type. */
const bindEventListeners = (element) => {
  if (element) {
    window.addEventListener('message', updateHeight);
  }
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'element' implicitly has an 'any' type. */
const unBindListeners = (element) => {
  if (element) {
    window.removeEventListener('message', updateHeight);
  }
};

const EmbedDefault = ({
  code,
  autoAdjustHeight,
  origin,
  embedWidth,
}: EmbedDefaultPropsInner) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (autoAdjustHeight && elementRef) {
      bindEventListeners(elementRef);
    }
    return () => unBindListeners(elementRef);
  }, [autoAdjustHeight, elementRef]);

  useEffect(() => {
    appendScripts(code, elementRef);
  }, [code, elementRef]);

  /* @ts-ignore TODO: TS7006 ->  Parameter 'htmlContent' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'elementRef' implicitly has an 'any' type. */
  const appendScripts = (htmlContent, elementRef) => {
    const html = document.createRange().createContextualFragment(htmlContent);
    if (elementRef.current) {
      elementRef.current.appendChild(html);
    }
  };

  return (
    <div
      data-testid="embed-default-wrapper"
      className={classNames('embedded-embed-default', {
        [styles.Wrapper]: origin !== MULTI_COLUMNS_PARAGRAPH,
        [styles.WrapperNoOverflow]: embedWidth === EMBED_WIDTH_FULL,
      })}
      ref={elementRef as LegacyRef<HTMLDivElement>}
    />
  );
};

export default EmbedDefault;
