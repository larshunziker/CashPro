import React from 'react';
import * as router from 'react-router';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import Component from '../index';
import {
  FULLSCREEN_HASH,
  FULLSCREEN_HASH_IMAGE_CLICK,
} from '../../../../../../shared/constants/fullscreen';

const imageId = '12345';

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('[Components] FullscreenButton', () => {
  test('Should not render fullscreen button wrapper', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <Component imageId={''} origin="" />
      </MemoryRouter>,
    );
    expect(queryByTestId('fullscreen-button-wrapper')).toBeNull();
  });

  test('Should render fullscreen button wrapper', () => {
    const { queryByTestId, container } = render(
      <MemoryRouter>
        <Component imageId={imageId} origin="teaser-stage" />
      </MemoryRouter>,
    );

    const link = container.firstChild;
    //@ts-ignore
    expect(link.getAttribute('data-href')).toBe(
      `#${FULLSCREEN_HASH_IMAGE_CLICK + FULLSCREEN_HASH}${imageId}`,
    );
    expect(queryByTestId('fullscreen-button-wrapper')).not.toBeNull();
  });

  test('Should navigate on button click', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <Component imageId={imageId} origin="" />
      </MemoryRouter>,
    );
    const button = queryByTestId('fullscreen-button-wrapper');
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
    fireEvent.click(button);

    expect(navigate).toHaveBeenCalledTimes(1);
  });
});
