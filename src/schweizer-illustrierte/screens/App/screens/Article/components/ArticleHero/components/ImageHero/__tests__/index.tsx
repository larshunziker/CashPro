import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import { settingsInitialState } from '../../../../../../../../../shared/reducers/settings';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import articleHeroImageMock from './mockData.json';

describe('[Screen] Article - ImageHero', () => {
  test('Should render nothing', () => {
    const { container } = render(
      <ReduxProvider>
        <Component
          articleHeroImage={{}}
          // @ts-ignore
          settingsState={settingsInitialState}
        />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  test('Should render article hero wrappers', () => {
    const { container } = render(
      <ReduxProvider>
        <HelmetProvider>
          <Component
            // @ts-ignore
            articleHeroImage={articleHeroImageMock}
            settingsState={settingsInitialState}
          />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(container).not.toBeNull();
  });

  // test.each([
  //   [{ format: null, expected: '3x2' }],
  //   [{ format: 'landscape', expected: '3x2' }],
  //   [{ format: 'portrait', expected: '2x3' }],
  //   [{ format: 'square', expected: '1x1' }],
  // ])('Should render the expected image format', (config) => {
  //   articleHeroImageMock.format = config.format;

  //   const { queryByTestId } = render(
  //     <ReduxProvider>
  //       <HelmetProvider>
  //         <Component
  //           // @ts-ignore
  //           articleHeroImage={articleHeroImageMock}
  //           settingsState={settingsInitialState}
  //         />
  //       </HelmetProvider>
  //     </ReduxProvider>,
  //   );

  //   expect(queryByTestId('articlehero-image').innerHTML).toEqual(
  //     expect.stringContaining(config.expected),
  //   );
  // });
});
