import React from 'react';
import { Provider } from 'react-redux';
import { Store, createStore } from 'redux';
import { render } from '@testing-library/react';
import { Logo } from '../index';
import {
  PUBLICATION_BIL,
  PUBLICATION_HZ,
  PUBLICATION_HZB,
  PUBLICATION_SWISS_INSURANCE,
} from '../../../../../../shared/constants/publications';

jest.mock('LinkLegacy');

const initialState: Record<string, any> = {
  navigation: { activePublication: PUBLICATION_HZ },
  route: { locationBeforeTransitions: { pathname: '/abonnements' } },
};
const store: Store = createStore((state) => state, initialState);

describe('[Component] Footer', () => {
  it('Should render HZ correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Logo publication={'handelszeitung'} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
  it('Should render BIL correctly', () => {
    initialState.navigation.activePublication = PUBLICATION_BIL;
    const BILstore: Store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={BILstore}>
        <Logo publication="bilanz" />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
  it('Should render Footer on BIL Abopage correctly', () => {
    initialState.navigation.activePublication = PUBLICATION_BIL;

    const { container } = render(
      <Provider store={store}>
        <Logo publication="bilanz" />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
  it('Should render INS correctly', () => {
    initialState.navigation.activePublication = PUBLICATION_SWISS_INSURANCE;
    const INSDstore: Store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={INSDstore}>
        <Logo publication="schweizer_versicherung" />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
  it('Should render HZB correctly', () => {
    initialState.navigation.activePublication = PUBLICATION_HZB;
    const INSDstore: Store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={INSDstore}>
        <Logo publication="hz_banking" />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
