/**
 * @file   Link Component Tests
 * @author Kornel Bobula <kornel.bobula@dreamlab.pl>
 * @date   2019-09-03
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Component from '../../LinkLegacy';

describe('[Component] LinkLegacy', () => {
  it('Should render empty link in case the `path` prop is empty', () => {
    // @ts-ignore
    const { queryByTestId } = render(<Component>test</Component>);

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('empty-link').innerHTML).toBe('test');
  });

  it('Should render proper link with correct text', () => {
    const textContent = 'visit www.zwyssighaus.ch';
    const { queryByTestId, getByText } = render(
      <Component
        link={{
          path: 'https://www.zwyssighaus.ch',
        }}
      >
        {textContent}
      </Component>,
    );

    expect(queryByTestId('default-link')).not.toBeNull();
    expect(getByText(textContent)).not.toBeNull();
  });

  it('Should render empty link if `path` is not a string', () => {
    const { queryByTestId } = render(
      <Component
        link={{
          // @ts-ignore
          path: 123,
        }}
      >
        test
      </Component>,
    );

    expect(queryByTestId('empty-link')).not.toBeNull();
  });

  it('Should render routed link correctly', () => {
    const relativePath = '/familie';
    const { queryByTestId } = render(
      <MemoryRouter>
        <Component
          link={{
            path: relativePath,
          }}
        >
          test
        </Component>
      </MemoryRouter>,
    );

    expect(queryByTestId('routed-link')).not.toBeNull();
  });

  it('Should render phone link correctly', () => {
    const phoneNumberPath = 'tel:123123123';
    const textContent = 'call me';
    const { queryByTestId, getByText } = render(
      <Component
        link={{
          path: phoneNumberPath,
        }}
      >
        {textContent}
      </Component>,
    );

    expect(queryByTestId('default-link')).not.toBeNull();
    expect(getByText(textContent)).not.toBeNull();
  });

  it('Should render WhatsApp link correctly', () => {
    const whatsAppPath = 'whatsapp://send?text=message';
    const textContent = 'Share message on WhatsApp!';
    const { queryByTestId, getByText } = render(
      <Component
        link={{
          path: whatsAppPath,
        }}
      >
        {textContent}
      </Component>,
    );

    expect(queryByTestId('default-link')).not.toBeNull();
    expect(getByText(textContent)).not.toBeNull();
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
      <Component
        link={{
          path,
        }}
        trackingData={trackingData}
      >
        {textContent}
      </Component>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render routed link if on same domain', () => {
    const path = 'https://www.beobachter.ch/';
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.locationOrigin = path;
    const { queryByTestId } = render(
      <MemoryRouter>
        <Component
          link={{
            path,
          }}
        >
          test
        </Component>
      </MemoryRouter>,
    );

    expect(queryByTestId('routed-link')).not.toBeNull();
  });

  it('Should render default link if href is on subdomain on same domain', () => {
    const path = 'https://contact.illustre.com/';
    const textContent = 'Visit our contact page!';
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.locationOrigin = 'https://www.illustre.com/';
    const { queryByTestId } = render(
      <Component
        link={{
          path,
        }}
      >
        Visit our contact page!
      </Component>,
    );

    expect(queryByTestId('default-link')).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('default-link').innerHTML).toBe(textContent);
  });
});
