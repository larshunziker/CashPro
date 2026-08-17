import React from 'react';
import { render } from '@testing-library/react';
import { windowInitialState } from '../../../../../../../../shared/reducers/window';
import { routeInitialState } from '../../../../../../../shared/reducers/route';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

const initialProps = JSON.parse(JSON.stringify(mockData));
const initialState = {
  window: windowInitialState,
  route: {
    ...routeInitialState,
    clientUrl: 'https://develop.publication.ch',
  },
};

describe('[Components] VideoLoopParagraph', () => {
  it('Should render correctly', () => {
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(queryByTestId('video-loop-paragraph-wrapper')).not.toBeNull();
  });
});
