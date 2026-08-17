import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import articleHeroImageMock from './mockData.json';

jest.mock('Picture');

describe('[Screen] Article - ImageGalleryHero', () => {
  test('Should render nothing', () => {
    const { queryByTestId } = render(
      <ReduxProvider>
        <Component gallery={null} />
      </ReduxProvider>,
    );
    expect(queryByTestId('wrapper')).toBeNull();
  });

  test('Should render article hero wrappers', () => {
    const { queryByTestId } = render(
      <ReduxProvider>
        <Component gallery={articleHeroImageMock} />
      </ReduxProvider>,
    );
    expect(queryByTestId('wrapper')).not.toBeNull();
  });
});
