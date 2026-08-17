import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import { routeInitialState } from '../../../../../../../shared/reducers/route';
import Component from '../index';
import {
  PUBLICATION_BIL,
  PUBLICATION_HZ,
  PUBLICATION_HZB,
  PUBLICATION_SWISS_INSURANCE,
} from '../../../../../../../../shared/constants/publications';

jest.mock('Link../../../../Logo');
jest.mock('../../../../../../../../common/components/Link');

const initialState = {
  navigation: { activePublication: PUBLICATION_HZ },
  route: routeInitialState,
};

describe('[Component] Header - HeaderLogo', () => {
  it('Should render HZ correctly', () => {
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        <Component publication={PUBLICATION_HZ} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
  it('Should render BIL correctly', () => {
    initialState.navigation.activePublication = PUBLICATION_BIL;
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        <Component publication={PUBLICATION_BIL} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
  it('Should render INS correctly', () => {
    initialState.navigation.activePublication = PUBLICATION_SWISS_INSURANCE;
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        <Component publication={PUBLICATION_SWISS_INSURANCE} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
  it('Should render HZB correctly', () => {
    initialState.navigation.activePublication = PUBLICATION_HZB;
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        <Component publication={PUBLICATION_HZB} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
