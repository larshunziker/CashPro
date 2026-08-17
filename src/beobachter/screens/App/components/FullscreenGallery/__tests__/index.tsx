import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { tealiumTrackEvent } from '../../../../../../shared/helpers/tealium';
import Component from '../index';
import ReduxProvider from './../../../../../shared/tests/components/ReduxProvider';
import MockedProvider from './../../../../../../shared/tests/components/MockedProvider';
import mockData from './mockData.json';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../queries'. '/Users/bhs/code/work/rasch-stack/src/beobachter/screens/App */
import { FULLSCREEN_GALLERY_QUERY } from '../queries';

jest.mock('../../ModalOverlay');
jest.mock('../../LoadingSpinner');

jest.mock('../../../../../../shared/helpers/tealium', () => {
  return {
    tealiumTrackEvent: jest.fn(),
  };
});

/* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
global.Ads = {
  config: {
    platform: 'MobileWeb|Desktop',
    publisher: 'rasch',
  },
  slots: [],
};

/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;
/* @ts-ignore TODO: TS7034 ->  Variable 'mockComponent' implicitly has type 'any' in some locations where its type cannot be determined. */
let mockComponent;

beforeEach(() => {
  global.location.hash = '#image__179148';
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.isFullscreenGallery = true;
  global.innerWidth = 1920;
  initialState = {};

  act(() => {
    mockComponent = (
      <MockedProvider
        mocks={[
          {
            request: {
              query: FULLSCREEN_GALLERY_QUERY,
              variables: {
                path: 'home',
                publication: 'BEO',
              },
            },
            result: JSON.parse(JSON.stringify(mockData)),
          },
        ]}
      >
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */}
        <ReduxProvider initialState={initialState}>
          <Component />
        </ReduxProvider>
      </MockedProvider>
    );
  });
});

describe('[Components] FullscreenGallery', () => {
  it('Should render correctly', async () => {
    global.innerWidth = 480;
    const component = (
      <MockedProvider
        mocks={[
          {
            request: {
              query: FULLSCREEN_GALLERY_QUERY,
              variables: {
                path: 'home',
                publication: 'BEO',
              },
            },
            result: JSON.parse(JSON.stringify(mockData)),
          },
        ]}
      >
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */}
        <ReduxProvider initialState={initialState}>
          <Component />
        </ReduxProvider>
      </MockedProvider>
    );

    const { queryByTestId, queryAllByTestId, container } = render(component);

    expect(queryByTestId('fullscreen-gallery-wrapper-loading')).not.toBeNull();
    expect(queryByTestId('fullscreen-gallery-loading-spinner')).not.toBeNull();
    expect(container).toMatchSnapshot();

    await waitFor(() =>
      expect(queryAllByTestId('image-gallery-items').length).toBe(3),
    );

    expect(queryByTestId('fullscreen-gallery-wrapper')).not.toBeNull();
    expect(queryByTestId('fullscreen-gallery-ad-wrapper')).toBeNull(); // no ads on XS viewport
    expect(queryByTestId('fullscreen-gallery-loading-spinner')).toBeNull();
    expect(queryAllByTestId('image-gallery-items').length).toBe(3);
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('fullscreen-gallery-counter').innerHTML).toBe('1 / 3');
  });

  it('Should close the image gallery with the [Esc] key', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'mockComponent' implicitly has an 'any' type. */
    const { queryByTestId, findByTestId } = render(mockComponent);

    await findByTestId('fullscreen-gallery-wrapper');
    const wrapper = queryByTestId('fullscreen-gallery-wrapper');
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    expect(global.isFullscreenGallery).toBe(true);

    act(() => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
      fireEvent.keyDown(wrapper, {
        key: 'Escape',
        keyCode: 27,
      });
    });

    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    expect(global.isFullscreenGallery).toBe(false);
  });

  /* This test sometimes fails and sometimes succeeds
     TODO: investigate why  */
  /*it('Should close the image gallery with the close button', async () => {
    initialState.window.viewport = {
      label: 'viewport/xl',
      from: 960,
      to: 1599,
    };

    const { queryByTestId } = render(mockComponent);

    await waitFor(() => {
      expect(global.isFullscreenGallery).toBe(true);
      expect(queryByTestId('fullscreen-gallery-close-button')).not.toBeNull();
    });

    const closeButton = queryByTestId('fullscreen-gallery-close-button');

    act(() => {
      fireEvent.click(closeButton);
    });

    await waitFor(() => {
      expect(global.isFullscreenGallery).toBe(false);
    });
  }); */

  it('Should hide and show the caption with the [i] key', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'mockComponent' implicitly has an 'any' type. */
    const { queryByTestId, findByTestId } = render(mockComponent);
    await findByTestId('fullscreen-gallery-wrapper');
    expect(queryByTestId('fullscreen-gallery-wrapper')).not.toBeNull();
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId(
        'fullscreen-gallery-caption-credit-wrapper',
      ).classList.contains('Active'),
    ).toBe(true);
    await findByTestId('fullscreen-gallery-caption-credit-wrapper');
    const infoButton = queryByTestId('fullscreen-gallery-info-button');

    act(() => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
      fireEvent.keyDown(infoButton, {
        keyCode: 73,
        key: 'i',
      });
    });

    await findByTestId('fullscreen-gallery-wrapper');
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId(
        'fullscreen-gallery-caption-credit-wrapper',
      ).classList.contains('Active'),
    ).toBe(false);

    act(() => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
      fireEvent.keyDown(infoButton, {
        keyCode: 73,
        key: 'i',
      });
    });

    await findByTestId('fullscreen-gallery-wrapper');
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId(
        'fullscreen-gallery-caption-credit-wrapper',
      ).classList.contains('Active'),
    ).toBe(true);
  });

  it('Should hide and show the caption with the info button', async () => {
    global.innerWidth = 960;
    /* @ts-ignore TODO: TS7005 ->  Variable 'mockComponent' implicitly has an 'any' type. */
    const { queryByTestId } = render(mockComponent);

    await waitFor(() => {
      expect(queryByTestId('fullscreen-gallery-wrapper')).not.toBeNull();
    });

    await waitFor(() => {
      expect(queryByTestId('fullscreen-gallery-wrapper')).not.toBeNull();
      expect(
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        queryByTestId(
          'fullscreen-gallery-caption-credit-wrapper',
        ).classList.contains('Active'),
      ).toBe(true);
    });

    const infoButton = queryByTestId('fullscreen-gallery-info-button');

    act(() => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
      fireEvent.click(infoButton);
    });

    await waitFor(() => {
      expect(
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        queryByTestId(
          'fullscreen-gallery-caption-credit-wrapper',
        ).classList.contains('Active'),
      ).toBe(false);
    });

    act(() => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
      fireEvent.click(infoButton);
    });

    await waitFor(() => {
      expect(
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        queryByTestId(
          'fullscreen-gallery-caption-credit-wrapper',
        ).classList.contains('Active'),
      ).toBe(true);
    });
  });

  it('Should go to the next and prev slide with the arrow keys', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'mockComponent' implicitly has an 'any' type. */
    const { queryByTestId, findByTestId } = render(mockComponent);

    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    expect(global.isFullscreenGallery).toBe(true);
    await findByTestId('fullscreen-gallery-wrapper');
    let wrapper = queryByTestId('fullscreen-gallery-wrapper');

    expect(queryByTestId('fullscreen-gallery-wrapper')).not.toBeNull();
    expect(tealiumTrackEvent).toHaveBeenCalledTimes(1);
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('fullscreen-gallery-counter').innerHTML).toBe('1 / 3');

    act(() => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
      fireEvent.keyDown(wrapper, {
        keyCode: 39,
        key: 'ArrowRight',
      });
    });

    await findByTestId('fullscreen-gallery-wrapper');
    wrapper = queryByTestId('fullscreen-gallery-wrapper');
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    expect(global.isFullscreenGallery).toBe(true);
    expect(tealiumTrackEvent).toHaveBeenCalledTimes(2);
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('fullscreen-gallery-counter').innerHTML).toBe('2 / 3');

    act(() => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
      fireEvent.keyDown(wrapper, {
        keyCode: 37,
        key: 'ArrowLeft',
      });
    });

    await findByTestId('fullscreen-gallery-wrapper');
    expect(tealiumTrackEvent).toHaveBeenCalledTimes(3);
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('fullscreen-gallery-counter').innerHTML).toBe('1 / 3');
  });

  it('Should go to the next and prev slide with buttons', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'mockComponent' implicitly has an 'any' type. */
    const { queryByTestId, findByTestId } = render(mockComponent);

    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    expect(global.isFullscreenGallery).toBe(true);
    await findByTestId('fullscreen-gallery-wrapper');
    expect(queryByTestId('fullscreen-gallery-wrapper')).not.toBeNull();
    expect(tealiumTrackEvent).toHaveBeenCalledTimes(1);
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('fullscreen-gallery-counter').innerHTML).toBe('1 / 3');

    await findByTestId('fullscreen-gallery-next-button');
    const nextButton = queryByTestId('fullscreen-gallery-next-button');
    act(() => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
      fireEvent.click(nextButton);
    });

    await findByTestId('fullscreen-gallery-wrapper');

    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    expect(global.isFullscreenGallery).toBe(true);
    expect(tealiumTrackEvent).toHaveBeenCalledTimes(2);
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('fullscreen-gallery-counter').innerHTML).toBe('2 / 3');
    await findByTestId('fullscreen-gallery-prev-button');
    const prevButton = queryByTestId('fullscreen-gallery-prev-button');

    act(() => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
      fireEvent.click(prevButton);
    });

    await findByTestId('fullscreen-gallery-wrapper');
    expect(tealiumTrackEvent).toHaveBeenCalledTimes(3);
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('fullscreen-gallery-counter').innerHTML).toBe('1 / 3');
  });

  it('Should show an ad on larger viewports', async () => {
    global.innerWidth = 960;

    /* @ts-ignore TODO: TS7005 ->  Variable 'mockComponent' implicitly has an 'any' type. */
    const { queryByTestId, findByTestId } = render(mockComponent);

    await findByTestId('image-gallery-items');
    expect(queryByTestId('fullscreen-gallery-ad-wrapper')).not.toBeNull();
  });

  it('Should hide ad on smaler viewports', async () => {
    global.innerWidth = 760;

    /* @ts-ignore TODO: TS7005 ->  Variable 'mockComponent' implicitly has an 'any' type. */
    const { queryByTestId, findByTestId } = render(mockComponent);

    await findByTestId('fullscreen-gallery-wrapper');
    expect(queryByTestId('fullscreen-gallery-ad-wrapper')).toBeNull();
  });
});
