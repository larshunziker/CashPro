import React, { useEffect, useMemo, useState } from 'react';
import { EmbedParagraphItemProps } from '../../typings';

type ContactFormProps = EmbedParagraphItemProps;

const IFRAME_DEFAULT_HEIGHT = 1000;

const EmbedContactForm = ({ code }: ContactFormProps) => {
  const [iFrameHeight, setIFrameHeight] = useState(0);

  useEffect(() => {
    const handleEventlistener = (event: MessageEvent) => {
      if (event.data.type === 'resize') {
        if (event.data.height && iFrameHeight !== event.data.height) {
          setIFrameHeight(event.data.height);
        }
      }
    };

    global.addEventListener('message', handleEventlistener);

    return () => {
      global.removeEventListener('message', handleEventlistener);
    };
  }, [iFrameHeight]);

  const htmlAttributes = useMemo(() => parseHtmlAttributes(code), [code]);

  if (!code || !htmlAttributes) {
    return null;
  }

  const {
    height = IFRAME_DEFAULT_HEIGHT,
    src = '',
    title = 'Contact',
  } = htmlAttributes;

  return (
    <iframe
      data-testid="contact-form-iframe"
      width="100%"
      height={iFrameHeight || height}
      title={title}
      src={src}
      scrolling="no"
      frameBorder="0"
    ></iframe>
  );
};

export const parseHtmlAttributes = (code: string) => {
  // parse code to Node
  const wrapper = document.createElement('div');
  wrapper.innerHTML = code;

  // get parsed element
  const el = (wrapper && wrapper.firstChild) as HTMLIFrameElement;

  return el;
};

export default EmbedContactForm;
