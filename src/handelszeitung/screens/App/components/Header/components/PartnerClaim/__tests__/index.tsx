import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
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
};

describe('[Component] Header - PartnerClaim', () => {
  it('Should render HZ PartnerClaim correctly', () => {
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        <Component publication={PUBLICATION_HZ} subtypeValue="" />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render BIL PartnerClaim correctly', () => {
    initialState.navigation.activePublication = PUBLICATION_BIL;
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        <Component publication={PUBLICATION_BIL} subtypeValue="" />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render SV PartnerClaim correctly', () => {
    initialState.navigation.activePublication = PUBLICATION_SWISS_INSURANCE;
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        <Component publication={PUBLICATION_BIL} subtypeValue="" />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render HZB PartnerClaim correctly', () => {
    initialState.navigation.activePublication = PUBLICATION_HZB;
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        <Component publication={PUBLICATION_HZB} subtypeValue="" />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
