import React from 'react';
import * as router from 'react-router';
import { fireEvent, render } from '@testing-library/react';
import handleWysiwygLink from '../handleWysiwygLink';

window.open = jest.fn();

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.locationOrigin = `beobachter.ch`;
  //@ts-ignore
  __APP_NAME__ = 'beobachter';
});

const initialEvent = {
  preventDefault: () => null,
  target: {
    href: 'https://www.google.ch',
    target: '_blank',
    host: 'www.google.ch',
    nodeName: 'A',
    pathname: '/',
    /* @ts-ignore TODO: TS7023 ->  'getAttribute' implicitly has return type 'any' because it does not have a return type annotation and is referenced dir */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'attr' implicitly has an 'any' type. */
    getAttribute: (attr) => {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ href */
      return initialEvent.target[attr];
    },
  },
};

afterEach(() => {
  //@ts-ignore
  window.open.mockClear();
  //@ts-ignore
  navigate.mockClear();
});

describe('[Function] handleWysiwygLink as Event', () => {
  it('[1] Should call window.open when target="_blank" and host not equals publication or localhost', () => {
    //@ts-ignore
    handleWysiwygLink(initialEvent, navigate);
    expect(window.open).toHaveBeenCalledTimes(1);
  });
  it('[2] Should call window.open when not same host', () => {
    initialEvent.target.target = '_self';
    //@ts-ignore
    handleWysiwygLink(initialEvent, navigate);
    expect(window.open).toHaveBeenCalledTimes(1);
  });
  it('[3] Should call navigate from router when target="_blank" but host=localhost', () => {
    initialEvent.target.host = 'localhost:3000';
    initialEvent.target.href = '/path';
    //@ts-ignore
    handleWysiwygLink(initialEvent, navigate);
    expect(navigate).toHaveBeenCalledTimes(1);
  });
  it('[4] Should call navigate from router when target="_blank" but host=publication', () => {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
    initialEvent.target.target = null;
    initialEvent.target.host = 'www.beobachter app.ch';
    //@ts-ignore
    handleWysiwygLink(initialEvent, navigate);
    expect(navigate).toHaveBeenCalledTimes(1);
  });
  it('[5] Should not call navigate from router when target="_self" and host not equals publication or localhost', () => {
    //@ts-ignore
    initialEvent.target = {
      href: 'http://someexternalurl.ch/fancy',
      target: '_self',
      host: 'www.someexternalurl.ch',
      nodeName: 'A',
      pathname: '/fancy',
    };
    //@ts-ignore
    handleWysiwygLink(initialEvent, navigate);
    expect(window.open).toHaveBeenCalledTimes(1);
  });
  it('[6] Should call navigate from router when target="_self" and host equals localhost and href is only a path', () => {
    //@ts-ignore
    initialEvent.target = {
      href: '/gesundheit/autismus',
      host: 'localhost:3000',
      target: '_blank',
      nodeName: 'A',
      pathname: '/gesundheit/autismus',
      getAttribute: (attr) => {
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ href */
        return initialEvent.target[attr];
      },
    };
    //@ts-ignore
    handleWysiwygLink(initialEvent, navigate);
    expect(navigate).toHaveBeenCalledTimes(1);
  });
  it('[7] Should call navigate from router when target="_blank" and host equals publication and href is only a path', () => {
    //@ts-ignore
    initialEvent.target = {
      href: '/gesundheit/autismus',
      host: 'www.beobachter app.ch',
      target: '_blank',
      nodeName: 'A',
      pathname: '/gesundheit/autismus',
    };
    //@ts-ignore
    handleWysiwygLink(initialEvent, navigate);
    expect(navigate).toHaveBeenCalledTimes(1);
  });
  it('[8] Should call window.open when target="_blank" and host not equals publication or localhost and href is only a path', () => {
    //@ts-ignore
    initialEvent.target = {
      href: '/gesundheit/autismus',
      host: 'www.someexternalurl.ch',
      target: '_blank',
      nodeName: 'A',
      pathname: '/gesundheit/autismus',
    };
    //@ts-ignore
    handleWysiwygLink(initialEvent, navigate);
    expect(window.open).toHaveBeenCalledTimes(1);
  });
  it('[9] Should take parent anchor tag if event.target is not a <a>', () => {
    const ParentLinkElement = () => {
      return (
        <a
          href="https://google.ch"
          // eslint-disable-next-line react/jsx-no-target-blank
          target="_blank"
          // @ts-ignore
          onClick={handleWysiwygLink}
        >
          <strong>Link</strong>
        </a>
      );
    };
    const { container } = render(<ParentLinkElement />);
    const strongTag = container.querySelector('strong');
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
    fireEvent.click(strongTag);
    expect(window.open).toHaveBeenCalledTimes(1);
  });
  it('[10] Should call window.open when target="_blank" and host equals publication but has subdomain', () => {
    //@ts-ignore
    initialEvent.target = {
      href: '/gesundheit/autismus',
      host: 'https://shop.beobachter.ch',
      target: '_blank',
      nodeName: 'A',
      pathname: '/gesundheit/autismus',
    };
    //@ts-ignore
    handleWysiwygLink(initialEvent, navigate);
    expect(window.open).toHaveBeenCalledTimes(1);
  });

  it('[11] Should call window.open page if it is a standalone page', () => {
    //@ts-ignore
    initialEvent.target = {
      href: '/authorize/?return_url=https://profile.s.onelog.ch/beobachter%23newsletter',
      host: 'https://beobachter.ch',
      target: '_blank',
      nodeName: 'A',
      pathname: '/authorize/',
    };
    //@ts-ignore
    handleWysiwygLink(initialEvent, navigate);
    expect(window.open).toHaveBeenCalledTimes(1);
  });

  it('[12] Should call window.open page if app name is sub domain', () => {
    //@ts-ignore
    initialEvent.target = {
      href: `https://${__APP_NAME__}.ebanking.bankzweiplus.ch/login`,
      host: `${__APP_NAME__}.ebanking.bankzweiplus.ch`,
      target: '_blank',
      nodeName: 'A',
      pathname: '/login',
    };
    //@ts-ignore
    handleWysiwygLink(initialEvent, navigate);
    expect(window.open).toHaveBeenCalledTimes(1);
  });
});

describe('[Function] handleWysiwygLink as String', () => {
  it('[1] Should call window.open when host not equals publication (https)', () => {
    handleWysiwygLink('https://www.google.com/', navigate);
    expect(window.open).toHaveBeenCalledTimes(1);
  });

  it('[2] Should call window.open when host not equals publication (http)', () => {
    handleWysiwygLink('http://www.google.com/', navigate);
    expect(window.open).toHaveBeenCalledTimes(1);
  });

  it('[3] Should call window.open when host not equals publication (www)', () => {
    handleWysiwygLink('www.google.com', navigate);
    expect(window.open).toHaveBeenCalledTimes(1);
  });

  it('[4] Should call window.open when link has not the same host', () => {
    handleWysiwygLink(`https://shop.${__APP_NAME__}`, navigate);
    expect(window.open).toHaveBeenCalledTimes(1);
  });

  it('[5] Should call window.open when link has __APP_NAME__ but is not the same host', () => {
    handleWysiwygLink(`https://google.com/${__APP_NAME__}`, navigate);
    expect(window.open).toHaveBeenCalledTimes(1);
  });

  it('[6] Should call navigate when host is equals publication', () => {
    handleWysiwygLink(`${__APP_NAME__}.ch/suche`, navigate);
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('[7] Should call navigate when link has absolute path', () => {
    handleWysiwygLink('/suche', navigate);
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('[8] Should call navigate when link has https and links to same host', () => {
    handleWysiwygLink(`https://${__APP_NAME__}.ch`, navigate);
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('[9] Should call navigate when link has http and links to same host', () => {
    handleWysiwygLink(`http://${__APP_NAME__}.ch`, navigate);
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('[10] Should call navigate when link has www and links to same host', () => {
    handleWysiwygLink(`www.${__APP_NAME__}.ch`, navigate);
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('[11] Should call window.open when link has www and links to same host but not ending with .ch', () => {
    handleWysiwygLink(`www.${__APP_NAME__}.at`, navigate);
    expect(window.open).toHaveBeenCalledTimes(1);
  });
});
