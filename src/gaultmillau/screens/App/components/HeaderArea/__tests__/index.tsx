import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { Store, createStore } from 'redux';
import { render } from '@testing-library/react';
import { navigationInitialState } from '../../../../../../shared/reducers/navigation';
import { scrollInitialState } from '../../../../../../shared/reducers/scroll';
import { searchInitialState } from '../../../../../../shared/reducers/search';
import headerInitialState from '../../../../../shared/reducers/header';
import { settingsInitialState } from '../../../../../shared/reducers/settings';
import Component from '../index';
import messages from '../../../../../i18n/translations/messages.json';

jest.mock('../../Header', () => {
  return () => {
    return null;
  };
});

jest.mock('../../Logo');

const mockProps = {
  isStickyEnabled: true,
  isHome: true,
};
const locationState = {
  locationBeforeTransitions: {
    pathname: '/',
    search: '',
    hash: '',
    action: 'POP',
    key: null,
    query: {},
  },
  vertical: 'vertical/home',
  screenReady: false,
};

const initialState: Record<string, any> = {
  route: locationState,
  search: searchInitialState,
  header: headerInitialState,
  window: {
    height: 500,
    scrollTop: 0,
    viewport: {
      label: 'viewport/xs',
      from: 0,
      to: 759,
    },
    width: 320,
  },
  scroll: scrollInitialState,
  navigation: {
    ...navigationInitialState,
    visibleNavigation: 'navigation-menu-type/default',
  },
  settings: settingsInitialState,
};
const store: Store = createStore((state) => state, initialState);

describe('[Component] HeaderArea', () => {
  it('Should render correctly on Home', () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <IntlProvider
          defaultLocale="de-CH"
          locale={'de'}
          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"de"' can't be used to index type '{ fr */
          messages={messages['de'] || {}}
          key={'de'}
        >
          <Component {...mockProps} />
        </IntlProvider>
      </Provider>,
    );
    expect(queryByTestId('headerarea-wrapper')).not.toBeNull();
    expect(queryByTestId('logo-wrapper')).not.toBeNull();
  });

  it('Should render correctly other pages than home', () => {
    mockProps.isHome = false;
    const { queryByTestId } = render(
      <Provider store={store}>
        <IntlProvider
          defaultLocale="de-CH"
          locale={'de'}
          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"de"' can't be used to index type '{ fr */
          messages={messages['de'] || {}}
          key={'de'}
        >
          <Component {...mockProps} />
        </IntlProvider>{' '}
      </Provider>,
    );
    expect(queryByTestId('headerarea-wrapper')).not.toBeNull();
    expect(queryByTestId('logo-wrapper')).toBeNull();
  });
});
