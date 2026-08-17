import React from 'react';
import { render } from '@testing-library/react';
import { windowInitialState } from '../../../../../../../../shared/reducers/window';
import { settingsInitialState } from '../../../../../../../shared/reducers/settings';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

let initialProps: any = {};
let initialState = {};

beforeEach(() => {
  initialProps = JSON.parse(JSON.stringify(mockData));

  initialState = {
    window: windowInitialState,
    settings: settingsInitialState,
  };
});

describe('[Component] ImageGallery - Stage', () => {
  it('Should not render image gallery (empty gallery props)', () => {
    initialProps = null;

    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore */}
        <Component gallery={initialProps} />
      </ReduxProvider>,
    );

    expect(queryByTestId('image-gallery-wrapper')).toBeNull();
  });

  it('Should render image gallery invisible (observed)', () => {
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore */}
        <Component gallery={initialProps} />
      </ReduxProvider>,
    );

    expect(queryByTestId('image-gallery-wrapper')).not.toBeNull();
  });

  it('Should render image gallery', () => {
    const { queryAllByTestId, queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore */}
        <Component gallery={initialProps} isComponentVisible={true} />
      </ReduxProvider>,
    );

    expect(queryByTestId('image-gallery-wrapper')).not.toBeNull();
    expect(queryByTestId('image-gallery-container')).not.toBeNull();
    expect(queryAllByTestId('image-gallery-container')).toHaveLength(1);

    expect(queryAllByTestId('image-gallery-short-title')).toHaveLength(2); // one is hidden with css depending on resolution
    expect(queryAllByTestId('image-gallery-short-title')[0]).not.toBeNull();
    expect(queryAllByTestId('image-gallery-short-title')[1]).not.toBeNull();
    expect(queryAllByTestId('image-gallery-short-title')[0]).toHaveTextContent(
      initialProps?.shortTitle,
    );
    expect(queryAllByTestId('image-gallery-short-title')[1]).toHaveTextContent(
      initialProps?.shortTitle,
    );

    expect(queryAllByTestId('image-gallery-title')).toHaveLength(2); // one is hidden with css depending on resolution
    expect(queryAllByTestId('image-gallery-title')[0]).not.toBeNull();
    expect(queryAllByTestId('image-gallery-title')[1]).not.toBeNull();
    expect(queryAllByTestId('image-gallery-title')[0]).toHaveTextContent(
      initialProps?.title,
    );
    expect(queryAllByTestId('image-gallery-title')[1]).toHaveTextContent(
      initialProps?.title,
    );

    expect(queryAllByTestId('image-gallery-items')).not.toBeNull();
  });
});
