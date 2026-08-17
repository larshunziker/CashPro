import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import classNames from 'classnames';
import subscribeButtonFactory, { filterSubscribedAlerts } from '../factory';
import { alertListInitialState } from '../../../../shared/reducers/alertList';
import { authInitialState } from '../../../../shared/reducers/auth';
import ReduxProvider from '../../../../beobachter/shared/tests/components/ReduxProvider';
import { SubscribeButtonProps } from '../typings';

jest.mock('../components/SubscribeIcon');
jest.mock('../../../../shared/helpers/tealium');

let initialState: any = {};

let initialProps: SubscribeButtonProps = {
  id: 0,
  type: 'keyword',
  label: '',
};
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;

const factoryOptions = {
  styles: {
    SubscribeButtonWrapper: 'SubscribeButtonWrapperClassName',
    LightTheme: 'LightThemeClassName',
    Text: 'TextClassName',
    Icon: 'IconClassName',
    Active: 'ActiveClassName',
    Animating: 'AnimatingClassName',
  },
  /* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'addClass' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'type' implicitly has an 'any' type. */
  Icon: ({ children, addClass, type }) => (
    <i className={classNames(type, addClass)}>{children}</i>
  ),
  ToastService: {
    displayDefaultErrorToast: jest.fn(),
    displayAuthenticationErrorToast: jest.fn(),
    displayLimitExceededToast: jest.fn(),
    displayAuthenticationInfoToast: jest.fn(),
  },
};

beforeEach(() => {
  Component = subscribeButtonFactory(factoryOptions);

  initialState = {
    auth: authInitialState,
    alertList: alertListInitialState,
  };

  initialProps = {
    id: 0,
    type: 'keyword',
    label: '',
  };
});

describe('[Common] SubscribeButton', () => {
  it('Should render correctly in default theme', () => {
    initialProps.type = 'keyword';
    initialProps.id = 727;

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly in light theme', () => {
    initialProps.type = 'keyword';
    initialProps.id = 727;
    initialProps.theme = 'light';

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render with with the "following"-state', () => {
    initialProps.type = 'node';
    initialProps.id = 727;
    initialProps.theme = 'light';
    initialState.alertList = { 'node-727': { timestamp: 1572014756876 } };
    initialState.auth.isAuthenticated = true;

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  /*  
  it('Should render correctly after clicking the CTA button (subscribe)', async () => {
    initialProps.type = 'keyword';
    initialProps.id = '123';
    initialState.auth.isAuthenticated = true;

    const store = createStore(
      state => state,
      initialState,
      applyMiddleware(thunk),
    );
    const { container, getByText } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    fireEvent.click(getByText('Folgen'));

    expect(container.querySelector('.AnimatingClassName')).not.toBeNull();
    expect(container).toMatchSnapshot();

    await waitFor(() => {
      expect(container.querySelector('.AnimatingClassName')).toBeNull();
    });
  });

  it('Should render correctly after clicking the CTA button (unsubscribe)', async () => {
    initialProps.type = 'node';
    initialProps.id = '123';
    initialState.auth.isAuthenticated = true;
    initialState.alertList = {
      ['node-123']: {
        timestamp: 1572014756876,
      },
    };

    const store = createStore(
      state => state,
      initialState,
      applyMiddleware(thunk),
    );
    const { container, getByText } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    fireEvent.click(getByText('Folge ich'));

    expect(container).toMatchSnapshot();
  });
  */

  it('Should render correctly after clicking the CTA button (not authenticated)', async () => {
    initialProps.type = 'keyword';
    initialProps.id = 123;
    initialProps.anchorId = 'email-alert-13432';
    initialState.auth.isAuthenticated = false;

    const spy = jest.spyOn(global.history, 'replaceState');

    const { container, getByText } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    fireEvent.click(getByText('Folgen'));

    expect(
      factoryOptions.ToastService.displayAuthenticationInfoToast,
    ).toHaveBeenCalledTimes(1);
    expect(global.history.replaceState).toHaveBeenCalledTimes(1);
    expect(container).toMatchSnapshot();

    spy.mockReset();
  });

  it('Should not replaceState if there is no anchorId given)', async () => {
    initialProps.type = 'keyword';
    initialProps.id = 123;
    initialState.auth.isAuthenticated = false;

    const spy = jest.spyOn(global.history, 'replaceState');

    const { getByText } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    fireEvent.click(getByText('Folgen'));
    expect(global.history.replaceState).toHaveBeenCalledTimes(0);

    spy.mockReset();
  });

  it('Should filter subscribed alerts', () => {
    const alertList = {
      'term-160088': {
        id: 1,
        timestamp: 1703056950045,
        recommended: true,
        subscribed: true,
        description:
          'Von der Redaktion handverlesene, sehr relevante und brandaktuelle Nachrichten.',
      },
      'term-147839': {
        timestamp: 1702999564129,
        recommended: true,
        subscribed: false,
        id: 2,
        description: 'Alle Nachrichten aus dem cash.ch Top News Kanal',
      },
      'term-167106': { timestamp: 1703058058479, label: 'Rat' },
    };
    const filteredAlerts = filterSubscribedAlerts(alertList);
    expect(filteredAlerts).toEqual({
      'term-160088': {
        id: 1,
        timestamp: 1703056950045,
        recommended: true,
        subscribed: true,
        description:
          'Von der Redaktion handverlesene, sehr relevante und brandaktuelle Nachrichten.',
      },
      'term-167106': { timestamp: 1703058058479, label: 'Rat' },
    });
  });

  it('Should not throw errors when subscribed alerts is empty', () => {
    const alertList = alertListInitialState;
    const filteredAlerts = filterSubscribedAlerts(alertList);
    expect(filteredAlerts).toEqual({});
  });
});
