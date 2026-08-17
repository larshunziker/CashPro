import React from 'react';
import { render } from '@testing-library/react';
import { settingsInitialState } from '../../../../../../../shared/reducers/settings';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component, { TeaserStageParagraphPropsInner } from '../index';
import mockData from './mockData.json';
import { CHANNEL_TYPE_SPECIAL } from '../../../../../screens/Channel/constants';

let initialProps: TeaserStageParagraphPropsInner;
let initialState = {};

beforeEach(() => {
  initialProps = {
    ...initialProps,
    ...JSON.parse(JSON.stringify(mockData)),
  };

  initialState = {
    settings: settingsInitialState,
  };
});

describe('[Component] TeaserStageParagraph', () => {
  it('Should render nothing if there are invalid props', () => {
    initialProps.teaserStage.termReference = null;
    initialProps.teaserStage.entities.edges = [];
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render a default teaser stage wrapper', () => {
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(
      queryByTestId('teaser-stage-paragraph-default-teaser-stage-wrapper'),
    ).not.toBeNull();
  });

  it('Should render a special L stage', () => {
    initialProps.teaserStage.termReference.channelType = CHANNEL_TYPE_SPECIAL;
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(
      queryByTestId('teaser-stage-paragraph-special-l-wrapper'),
    ).not.toBeNull();
  });
});
