import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import {
  checkBlackList,
  checkWhiteList,
  getLinkRel,
  getLinkTarget,
  isSpecialProtocol,
  removeProtocolAndSubdomain,
} from '../helpers';
import Component from '../../Link';
import config from '../config.json';
import testConfig from './testConfig.json';

beforeEach(() => {
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.locationOrigin = 'https://www.illustre.com/';
});

describe('[Component] Link', () => {
  it('Should render empty link in case the `path` prop is empty', () => {
    // @ts-ignore
    const { queryByTestId } = render(
      <MemoryRouter>
        <Component>test</Component>
      </MemoryRouter>,
    );

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('empty-link').innerHTML).toBe('test');
  });

  it('Should render proper link with correct text', () => {
    const textContent = 'visit www.zwyssighaus.ch';
    const { queryByTestId, getByText } = render(
      <MemoryRouter>
        <Component path={'https://www.zwyssighaus.ch'}>{textContent}</Component>
      </MemoryRouter>,
    );
    expect(queryByTestId('default-link')).toHaveProperty('target', '_blank');
    expect(queryByTestId('default-link')).toHaveProperty(
      'rel',
      'noopener nofollow',
    );
    expect(queryByTestId('default-link')).not.toBeNull();
    expect(getByText(textContent)).not.toBeNull();
  });

  it('Should render empty link if `path` is not a string', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <Component
          // @ts-ignore
          path={123}
        >
          test
        </Component>
      </MemoryRouter>,
    );

    expect(queryByTestId('empty-link')).not.toBeNull();
  });

  it('Should render routed link correctly', () => {
    const relativePath = '/familie';
    const { queryByTestId } = render(
      <MemoryRouter>
        <Component path={relativePath}>test</Component>
      </MemoryRouter>,
    );
    expect(queryByTestId('routed-link')).not.toBeNull();
  });

  it('Should render routed link with corect label correctly', () => {
    const relativePath = '/familie';
    const { queryByTestId } = render(
      <MemoryRouter>
        <Component path={relativePath} label="family" />
      </MemoryRouter>,
    );
    expect(queryByTestId('routed-link')).toHaveProperty('rel', '');
    expect(queryByTestId('routed-link')).toHaveProperty('target', '');
    expect(queryByTestId('routed-link')).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('routed-link').innerHTML).toBe('family');
  });

  it('Should render phone link correctly', () => {
    const phoneNumberPath = 'tel:123123123';
    const textContent = 'call me';
    const { queryByTestId, getByText } = render(
      <MemoryRouter>
        <Component path={phoneNumberPath} label={textContent} />
      </MemoryRouter>,
    );
    expect(queryByTestId('default-link')).not.toBeNull();
    expect(getByText(textContent)).not.toBeNull();
    expect(queryByTestId('default-link')).toHaveProperty(
      'rel',
      'noopener nofollow',
    );
    expect(queryByTestId('default-link')).toHaveProperty('target', '_blank');
    expect(queryByTestId('default-link')).toHaveProperty(
      'href',
      phoneNumberPath,
    );
  });

  it('Should render WhatsApp link correctly', () => {
    const whatsAppPath = 'whatsapp://send?text=message';
    const textContent = 'Share message on WhatsApp!';
    const { queryByTestId, getByText } = render(
      <MemoryRouter>
        <Component path={whatsAppPath} label={textContent} />
      </MemoryRouter>,
    );
    expect(queryByTestId('default-link')).not.toBeNull();
    expect(getByText(textContent)).not.toBeNull();
    expect(queryByTestId('default-link')).toHaveProperty(
      'rel',
      'noopener nofollow',
    );
    expect(queryByTestId('default-link')).toHaveProperty('target', '_blank');
    expect(queryByTestId('default-link')).toHaveProperty('href', whatsAppPath);
  });

  it('Should set trackinData', () => {
    const path = 'https://www.beobachter.ch/';
    const textContent = 'Visit beobachter';
    const trackingData = [
      {
        type: 'external-link',
        value: 'external-link/default',
      },
    ];
    const { container } = render(
      <MemoryRouter>
        <Component
          path={path}
          trackingData={trackingData}
          label={textContent}
        />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render external link correctly BEO', () => {
    const path = 'https://www.beobachter.ch/';
    const textContent = 'Visit beobachter';
    const { queryByTestId, getByText } = render(
      <MemoryRouter>
        <Component path={path} label={textContent} />
      </MemoryRouter>,
    );

    expect(queryByTestId('default-link')).not.toBeNull();
    expect(getByText(textContent)).not.toBeNull();
    expect(queryByTestId('default-link')).toHaveProperty('target', '_blank');
    expect(queryByTestId('default-link')).toHaveProperty('href', path);
  });

  it('Should render external link correctly HZ', () => {
    const path = 'https://www.handelszeitung.ch/';
    const textContent = 'Visit beobachter';
    const { queryByTestId, getByText } = render(
      <MemoryRouter>
        <Component path={path} label={textContent} />
      </MemoryRouter>,
    );

    expect(queryByTestId('default-link')).not.toBeNull();
    expect(getByText(textContent)).not.toBeNull();
    expect(queryByTestId('default-link')).toHaveProperty('target', '_blank');
    expect(queryByTestId('default-link')).toHaveProperty('href', path);
  });

  it('Should render external link correctly with nofollow', () => {
    const path = 'https://www.facebook.com/';
    const textContent = 'Visit Facebook';
    const { queryByTestId, getByText } = render(
      <MemoryRouter>
        <Component path={path} label={textContent} />
      </MemoryRouter>,
    );

    expect(queryByTestId('default-link')).not.toBeNull();
    expect(getByText(textContent)).not.toBeNull();
    expect(queryByTestId('default-link')).toHaveProperty(
      'rel',
      'noopener nofollow',
    );
    expect(queryByTestId('default-link')).toHaveProperty('target', '_blank');
    expect(queryByTestId('default-link')).toHaveProperty('href', path);
  });

  it('Should render routed link if href is on same domain', () => {
    const path = 'https://www.illustre.com/abc/def?foo=bar2222#charts';
    const textContent = 'Visit illustre';
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.locationOrigin = path;
    const { container, queryByTestId } = render(
      <MemoryRouter>
        <Component path={path} label={textContent} />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
    expect(queryByTestId('default-link')).toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('routed-link').innerHTML).toBe(textContent);
  });

  it('Should render default link if href is on subdomain on same domain', () => {
    const path = 'https://contact.illustre.com/abc/def?foo=bar#charts';
    const textContent = 'Visit our contact page!';
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.locationOrigin = 'https://www.illustre.com/';
    const { container, queryByTestId } = render(
      <MemoryRouter>
        <Component path={path} label={textContent} />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
    expect(queryByTestId('default-link')).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('default-link').innerHTML).toBe(textContent);
  });
});

describe('[helpers] Link', () => {
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.locationOrigin = 'https://www.illustre.com/';

  test.each([
    ...config.nofollow,
    'https://www.facebook.com/NyanCatWorld/',
    'https://mobile.twitter.com/',
  ])('Should blacklist %s', (domain) => {
    expect(checkBlackList(domain)).toBeTruthy();
  });
  test.each([
    'https://www.handelszeitung.ch/',
    'https://www.google.com/',
    'www.onet.pl',
    'bilanz.ch',
  ])('Should not blacklist %s', (url) => {
    expect(checkBlackList(url)).toBeFalsy();
  });

  // @ts-ignore
  test.each(config.whiteList, 'Should whitelist %s', (domain) => {
    expect(checkWhiteList(domain)).toBeTruthy();
  });
  test.each([
    'https://www.dreamlab.pl/',
    'http://www.nonexistingurladdress.ch/',
    'https://www.wikipedia.org/',
  ])('Should not whitelist %s', (url) => {
    expect(checkWhiteList(url)).toBeFalsy();
  });

  test.each([
    'https://www.dreamlab.pl/',
    'www.example.com',
    'www.example.com',
    'wikipedia.org/',
  ])('Should return %s without protocol and "www" ', (url) => {
    const hasProtocolOrSubdomain = /^(www\.|http[s]?:\/\/www.|https?)/i;
    const newUrl = removeProtocolAndSubdomain(url);
    expect(newUrl).toEqual(expect.not.stringMatching(hasProtocolOrSubdomain));
  });

  test.each([
    'https://www.dreamlab.pl/',
    'http://www.nonexistingurladdress.ch/',
    'tel:123123123',
    'whatsapp://send?text=message',
  ])('Should find special protocol in %s ', (url) => {
    expect(isSpecialProtocol(url)).toBeTruthy();
  });
  test.each([
    'www.dreamlab.pl/',
    'www.nonexistingurladdress.ch/',
    'nonexistingurladdress.ch',
  ])('Should not find special protocol in %s ', (url) => {
    expect(isSpecialProtocol(url)).toBeFalsy();
  });

  it('Should return target=[_blank] for external urls', () => {
    expect(getLinkTarget('www.dreamlab.pl/')).toBe('_blank');
  });
  it('Should return target=[_self] for links in same domain with special protocols', () => {
    expect(getLinkTarget('https://www.illustre.com/')).toBe('_self');
  });
  it('Should return target=[undefined] for links in same domain without special protocols', () => {
    expect(getLinkTarget(removeProtocolAndSubdomain('www.illustre.com/'))).toBe(
      undefined,
    );
  });

  it('Should return rel=[undefined] for urls in sameDomain', () => {
    expect(getLinkRel('https://www.illustre.com/')).toBe(undefined);
  });
  it('Should enrich link rel attribute when rel=[sponsored]', () => {
    expect(getLinkRel('https://www.illustre.com/', 'sponsored')).toBe(
      'sponsored',
    );
    expect(getLinkRel('https://www.dreamlab.pl/', 'sponsored')).toBe(
      'noopener sponsored',
    );
  });
  test.each([
    ...config.nofollow,
    ...config.whiteList.filter((link) => link !== 'https://www.illustre.com/'),
    'www.dreamlab.pl/',
    'www.nonexistingurladdress.ch/',
    'https://www.dreamlab.pl/',
    'http://www.nonexistingurladdress.ch/',
  ])('Should return rel=[noopener nofollow] for external link %s', (url) => {
    expect(getLinkRel(url)).toBe('noopener nofollow');
  });

  testConfig.regexTestUrls.forEach((publication) => {
    describe(`[helpers] regex resolving ${Object.keys(publication)[0]}`, () => {
      const pubName = Object.keys(publication)[0];
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ CASH */
      const testItem = publication[pubName];

      testItem.urls.forEach((item: any) => {
        it(`Should resolve regex pattern correctly for ${item.textContent}`, () => {
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          global.locationOrigin = testItem.locationOrigin;
          const hasProtocolOrSubdomain = /^(www\.|http[s]?:\/\/www.|https?)/i;
          const newUrl = removeProtocolAndSubdomain(item.url);

          const { container } = render(
            <MemoryRouter>
              <Component path={item.url} label={item.textContent} />,
            </MemoryRouter>,
          );

          expect(container).toMatchSnapshot();
          expect(newUrl).toEqual(
            expect.not.stringMatching(hasProtocolOrSubdomain),
          );
        });
      });
    });
  });
});
