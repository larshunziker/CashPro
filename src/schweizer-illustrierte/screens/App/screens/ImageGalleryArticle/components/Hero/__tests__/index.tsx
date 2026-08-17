import { render } from '@testing-library/react';
import React from 'react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import { settingsInitialState } from '../../../../../../../shared/reducers/settings';
import { windowInitialState } from '../../../../../../../../shared/reducers/window';
import Component from '../index';
import teaserImageMock from './mockData.json';

let teaserImage: { format?: string; image?: Image } = {};
let passedProps = {};
let initialState = {};
jest.mock('Picture');

beforeEach(() => {
  teaserImage = JSON.parse(JSON.stringify(teaserImageMock));

  initialState = {
    settings: settingsInitialState,
    window: windowInitialState,
  };

  passedProps = {
    title: 'Hallo Welt example',
    shortTitle: 'ShortTitle Example',
  };
});

describe('[Screen] ImageGallery - Hero', () => {
  test('Should render nothing', () => {
    const { container } = render(
      <ReduxProvider state={initialState}>
        <Component teaserImage={{}} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  test('Should render nothing if there is no heroImage', () => {
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    teaserImage.image.file = {};
    const { container } = render(
      <ReduxProvider state={initialState}>
        <Component teaserImage={teaserImage} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  test('Should render hero wrappers', () => {
    const { container, queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <Component teaserImage={teaserImage} {...passedProps} />
      </ReduxProvider>,
    );
    expect(container).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('hero-image-container').innerHTML).not.toBeNull();
  });

  // test.each([
  //   [{ format: null, expected: '16x9' }],
  //   [{ format: 'landscape', expected: '16x9' }],
  // ])('Should render the expected image format', (config) => {
  //   teaserImage.format = config.format;

  //   const { queryByTestId } = render(
  //     <ReduxProvider state={initialState}>
  //       <Component teaserImage={teaserImage} {...passedProps} />
  //     </ReduxProvider>,
  //   );

  //   expect(queryByTestId('hero-image-container').innerHTML).toEqual(
  //     expect.stringContaining(config.expected),
  //   );
  // });
});
