import { render } from '@testing-library/react';
import React from 'react';
import { settingsInitialState } from '../../../../../shared/reducers/settings';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import articleHeadMock from './mockData.json';

let initialState = {};

beforeEach(() => {
  initialState = {
    settings: settingsInitialState,
  };
});

describe('[Component] Head', () => {
  test('Should render nothing if there are no valid props', () => {
    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <Component title="" shortTitle="" lead="" />
      </ReduxProvider>,
    );

    expect(queryByTestId('head-wrapper')).toBeNull();
  });

  test('Should render only title', () => {
    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <Component title={articleHeadMock.title} shortTitle="" lead="" />
      </ReduxProvider>,
    );

    expect(queryByTestId('head-wrapper')).not.toBeNull();
    expect(queryByTestId('head-title-wrapper')).not.toBeNull();
    expect(queryByTestId('head-shorttitle-wrapper')).toBeNull();
    expect(queryByTestId('head-lead-wrapper')).toBeNull();
  });

  test('Should render only shortTitle', () => {
    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <Component title="" shortTitle={articleHeadMock.shortTitle} lead="" />
      </ReduxProvider>,
    );

    expect(queryByTestId('head-wrapper')).not.toBeNull();
    expect(queryByTestId('head-title-wrapper')).toBeNull();
    expect(queryByTestId('head-shorttitle-wrapper')).not.toBeNull();
    expect(queryByTestId('head-lead-wrapper')).toBeNull();
  });

  test('Should render only lead', () => {
    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <Component title="" shortTitle="" lead={articleHeadMock.lead} />
      </ReduxProvider>,
    );

    expect(queryByTestId('head-wrapper')).not.toBeNull();
    expect(queryByTestId('head-title-wrapper')).toBeNull();
    expect(queryByTestId('head-shorttitle-wrapper')).toBeNull();
    expect(queryByTestId('head-lead-wrapper')).not.toBeNull();
  });

  test('Should render title, shortTitle and lead', () => {
    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <Component
          title={articleHeadMock.title}
          shortTitle={articleHeadMock.shortTitle}
          lead={articleHeadMock.lead}
        />
      </ReduxProvider>,
    );

    expect(queryByTestId('head-wrapper')).not.toBeNull();
    expect(queryByTestId('head-title-wrapper')).not.toBeNull();
    expect(queryByTestId('head-shorttitle-wrapper')).not.toBeNull();
    expect(queryByTestId('head-lead-wrapper')).not.toBeNull();
  });
});
