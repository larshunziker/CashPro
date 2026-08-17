/**
 * @file   embedDefault render
 */

import React, { LegacyRef, useEffect } from 'react';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import shouldUpdate from 'recompose/shouldUpdate';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import { stripScriptTagsFromView } from '../../../../../../../shared/helpers/ssrPreload';
import styles from './styles.legacy.css';
import { EmbedParagraphItemProps } from '../../typings';
export type EmbedDefaultPropsInner = EmbedParagraphItemProps & {
  handleRef: Function;
  elementRef: string;
  setElementRef: Function;
};

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
  // the current scripts which are by now deployed on cash clients in production are by now using the frame
  // we requested the clients to update theyr scripts by adding the src atribute instead of the frame
  // in the frame we are getting by now the hash from the iframe url for example https://cash.ch/embed/123#hash
  // then we are searching for the iframe with the src attribute which has the hash
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
  handleRef,
  elementRef,
  autoAdjustHeight,
}: EmbedDefaultPropsInner) => {
  useEffect(() => {
    if (autoAdjustHeight && elementRef) {
      bindEventListeners(elementRef);
    }
    return () => unBindListeners(elementRef);
  }, [autoAdjustHeight, elementRef]);

  useEffect(() => {
    // used for the Vonobel partner integration on Cash (/derivate)
    // an <ins> tag is used there to load a google ad for the partner.
    // the only way we were able to get this work in the react scope,
    // was to append the needed script tags to the body and remove them
    // again on component unmount
    if (code.indexOf('<ins') > -1) {
      const scriptSourcePattern = new RegExp('<script.*></script>', 'gm');

      const scriptTags = code.match(scriptSourcePattern);
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      scriptTags.forEach((tag) => {
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        const src = tag.match(/src="([^"]*)"/)[1];
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        // used too identify the appended script so we can
        // easily remove them from the DOM when the component is unmounting
        script.dataset.appendedScript = 'appended-script';
        document.body.appendChild(script);
      });

      return () => {
        // On Component umnount, we alwayays have to remove the appended scripts
        // again from the DOM when the componentto get sure we don't spam the DOM with scripts
        const appendedScripts = document.querySelectorAll(
          'script[data-appended-script]',
        );
        appendedScripts.forEach((scriptToRemove) => {
          document.body.removeChild(scriptToRemove);
        });
      };
    }
  });

  return (
    <div
      data-testid="embed-default-wrapper"
      className={`embedded-embed-default ${styles.Wrapper}`}
    >
      {/* eslint-disable react/no-danger */}
      {code && (
        <div
          ref={handleRef as LegacyRef<HTMLDivElement>}
          dangerouslySetInnerHTML={{ __html: stripScriptTagsFromView(code) }}
        />
      )}
      {/* eslint-enable react/no-danger */}
    </div>
  );
};

export const withElementRefState = withState<
  Record<string, any>,
  any,
  any,
  string
>('elementRef', 'setElementRef', null);

const createElement = (htmlString: string) => {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  return div.firstChild as HTMLElement;
};

const renderScript = (script: string, element: HTMLDivElement): void => {
  if (!script.length || !element) {
    return;
  }

  // dummy element which is not attached to DOM, only for get all attributes and innerText
  const htmlElement = createElement(script);

  // inner script content which could be set inside script tag
  const innerScript = document.createTextNode(htmlElement.innerHTML);

  // actual script tag which will be attached to DOM
  const scriptTag = document.createElement('script');
  scriptTag.type = 'text/javascript';
  scriptTag.async = true;

  if (innerScript) {
    scriptTag.appendChild(innerScript);
  }

  // copy all attributes from dummy element to actual script tag
  for (let i = 0; i < htmlElement.attributes.length; i++) {
    const attribute = htmlElement.attributes[i];

    scriptTag.setAttribute(attribute.name, attribute.value);
  }

  // attach actual script tag to DOM
  if (element && element.parentNode) {
    element.parentNode.appendChild(scriptTag);
  }
};

export const withHandleRef = withHandlers({
  handleRef:
    (props: EmbedDefaultPropsInner) =>
    (element: HTMLDivElement): void => {
      if (!props.elementRef && element) {
        props.setElementRef(element);
      }
    },
});

/**
 * regexp for script tags
 *
 * @description this regular expression catches X script tags and groups them in an array
 *              selfcoling script tags are not allowed
 * examples:    <script>console.log('Hello World')</script>
 *              or <script src="some.Wemfpixel/url"></script>
 *              or <div id="foo"></div>
 *                 <script src="some/javascriptlibrary"></script>
 *                 <script data-some="some-data-tag">some logic catching the div by id and do something within the library</script>
 *
 *  add this (<!['"])?<script([^<>]*?src=['"]?([^"']*)['"]?)?[^<>]*?>([\s\S]*?|[^<]*?)<\/script>(?!['"]) to
 *  https://regex101.com use flavor javascript for more Explanation
 *
 */
const testerScript = new RegExp( // eslint-disable-line no-invalid-regexp
  `(<!['"])?<script([^<>]*?src=['"]?([^"']*)['"]?)?[^<>]*?>([\\s\\S]*?|[^<]*?)<\\/script>(?!['"])`,
  'g', // eslint-disable-line
);

export const withLifecycle = lifecycle<any, any>({
  // no didMount needed because of ref rerender
  componentDidUpdate(): void {
    const code: string = this.props.code.replace(/ async/g, '');
    testerScript.lastIndex = 0;
    const script: Array<any> | null = testerScript.exec(code);
    if (this.props.code && script && Array.isArray(script)) {
      renderScript(script[0], this.props.elementRef);
    }
  },
});

export const withUpdatePolicy = shouldUpdate<any>(
  (props: EmbedDefaultPropsInner, nextProps: EmbedDefaultPropsInner): boolean =>
    props.code !== nextProps.code || props.elementRef !== nextProps.elementRef,
);

export default compose<any, any>(
  withElementRefState,
  withUpdatePolicy,
  withHandleRef,
  withLifecycle,
)(EmbedDefault);
